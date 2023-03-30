import Posts from "@/models/Posts";
import connectMongo from "@/utils/db";
import { GET, POST } from "@/utils/reqMethods";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import path, { join } from "path";
import formidable from "formidable";

const FormidableError = formidable.errors.FormidableError;

async function parseForm(req) {
  const form = new formidable.IncomingForm({
    uploadDir: path.join(process.cwd(), "public", "uploads"),
    keepExtensions: true,
  });
  req.headers["content-type"] =
    "multipart/form-data; boundary=" + form._boundary;
  let formfields = await new Promise((resolve, reject) => {
    // console.log("Parsing in progress....");
    // console.log(req.headers);
    form.parse(req, function (err, fields, files) {
      console.log("IamPArsing");
      if (err) {
        console.log(err);
        return reject(err);
      }
      resolve({ fields, files });
    });
  });
  console.log("FINISHED");
}

const createPost = async (req, res, session) => {
  console.log("Create Posts Hit");
  try {
    const { content, image } = req.body;
    const post = await Posts.create({
      image,
      content,
      createdBy: session.user.id,
    });

    res.status(201).json({
      success: true,
      data: post,
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
  const session = await getServerSession(req, res, authOptions);

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
