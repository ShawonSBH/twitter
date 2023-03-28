import Posts from "@/models/Posts";
import connectMongo from "@/utils/db";
import { GET, POST } from "@/utils/reqMethods";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

const createPost = async (req, res, session) => {
  const { content, image } = req.body;
  try {
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
    const posts = await Posts.find({}).populate({
      path: "createdBy",
      select: { password: 0, dob: 0, followers: 0 },
    });
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
