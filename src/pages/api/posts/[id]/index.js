import Posts from "@/models/Posts";
import connectMongo from "@/utils/db";
import { DELETE, GET } from "@/utils/reqMethods";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";

const deletePost = async (req, res, userData) => {
  const { id } = req.query;
  console.log(userData);
  try {
    const post = await Posts.findById(id);
    if (session.user.id === post.createdBy) {
      await post.deleteOne();
      res.status(200).json({
        success: true,
        message: "Post deleted",
      });
    } else {
      res.status(401).json({
        success: false,
        message: "You are not authorized to delete this post",
      });
    }
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

const getPost = async (req, res) => {
  const { id } = req.query;
  console.log(id);
  try {
    const post = await Posts.findById(id).populate({
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
    res.status(200).json({
      success: true,
      post,
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
      await getPost(req, res);
      break;
    case DELETE:
      await deletePost(req, res, session.user);
      break;
    default:
      res
        .status(404)
        .json({ success: false, message: "API endpoint not found" });
  }
}
