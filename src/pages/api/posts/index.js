import Posts from "@/models/Posts";
import connectMongo from "@/utils/db";
import { GET, POST } from "@/utils/reqMethods";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import path from "path";
import formidable from "formidable";
import { error } from "console";

const FormidableError = formidable.errors.FormidableError;

export const config = {
  api: {
    bodyParser: false,
  },
};

export const parseForm = async (req) => {
  return new Promise((resolve, reject) => {
    const form = new formidable.IncomingForm({
      uploadDir: path.join(process.cwd(), "public", "uploads"),
      keepExtensions: true,
    });
    form.parse(req, function (err, fields, files) {
      if (err) {
        console.log(err);
        return reject(err);
      }
      resolve({ fields, files });
    });
  });
};

const createPost = async (req, res, session) => {
  console.log("Create Posts Hit");
  try {
    const { fields, files } = await parseForm(req);
    console.log(fields);
    const image = files.image ? "/uploads/" + files.image?.newFilename : null;
    const content = fields.content;

    console.log(image, content);

    const createdPost = await Posts.create({
      image,
      content,
      createdBy: session.user.id,
    });

    const post = await createdPost.populate({
      path: "createdBy",
      select: {
        _id: 1,
        name: 1,
        username: 1,
        email: 1,
        profilePicture: 1,
      },
    });

    console.log(post);
    res.status(201).json({
      success: true,
      post,
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const posts = await Posts.find({})
      .sort({ createdAt: -1 })
      .populate({
        path: "createdBy",
        select: {
          _id: 1,
          name: 1,
          username: 1,
          email: 1,
          profilePicture: 1,
        },
      });
    // posts.sort(-1);
    res.status(200).json({
      success: true,
      posts,
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export default async function handler(req, res) {
  await connectMongo();
  const session = await getServerSession(req, res, authOptions());

  switch (req.method) {
    case GET:
      await getAllPosts(req, res);
      break;
    case POST:
      await createPost(req, res, session);
      break;
    default:
      res
        .status(404)
        .json({ success: false, message: "API endpoint not found" });
  }
}
