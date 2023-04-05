import Posts from "@/models/Posts";
import Reacts from "@/models/Reacts";
import connectMongo from "@/utils/db";
import { DELETE, GET, PUT } from "@/utils/reqMethods";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";
import { parseForm } from "..";
import Comments from "@/models/Comments";

export const config = {
  api: {
    bodyParser: false,
  },
};

const deletePost = async (req, res, userData) => {
  console.log("Delete Route Hit");
  const { id } = req.query;
  console.log(userData);
  try {
    const post = await Posts.findById(id);
    if (userData.id === post.createdBy.toString()) {
      await Reacts.deleteMany({ postLink: post._id });
      await Comments.deleteMany({ postLink: post._id });
      //post.comments?.forEach(comment);
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

const updatePost = async (req, res, userData) => {
  console.log("Update Route Hit");
  const { id } = req.query;
  try {
    const post = await Posts.findById(id);
    if (userData.id === post.createdBy.toString()) {
      const { fields, files } = await parseForm(req);
      const image = files.image ? "/uploads/" + files.image?.newFilename : null;
      const content = fields.content;
      const imageURL = fields.imageUrl;

      //console.log(content, imageURL);
      post.content = content;
      if (image || (image === null && imageURL === null)) {
        post.image = image;
      }

      await post.save();

      res.status(200).json({
        success: true,
        message: "Post updated",
        post,
      });
    } else {
      res.status(401).json({
        success: false,
        message: "You are not authorized to edit this post",
      });
    }
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

const getPost = async (req, res) => {
  console.log("Get Route Hit");
  const { id } = req.query;
  console.log(id);
  try {
    const post = await Posts.findById(id)
      .populate({
        path: "createdBy",
        select: {
          _id: 1,
          name: 1,
          username: 1,
          email: 1,
          profilePicture: 1,
        },
      })
      .populate({
        path: "comments",
        populate: [
          {
            path: "commentor",
            select: {
              _id: 1,
              name: 1,
              username: 1,
              email: 1,
              profilePicture: 1,
            },
          },
          {
            path: "replies",
            populate: {
              path: "commentor",
              select: {
                _id: 1,
                name: 1,
                username: 1,
                email: 1,
                profilePicture: 1,
              },
            },
          },
        ],
        options: { sort: { createdAt: -1 } },
        select: {
          content: 1,
          createdAt: 1,
        },
      })
      .populate({
        path: "likes",
        select: {
          _id: 0,
          reactor: 1,
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
    case PUT:
      await updatePost(req, res, session.user);
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
