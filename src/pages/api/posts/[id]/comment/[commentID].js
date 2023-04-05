import Comments from "@/models/Comments";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import connectMongo from "@/utils/db";
import { DELETE, POST, PUT } from "@/utils/reqMethods";
import { getServerSession } from "next-auth";

const updateComment = async (req, res, userData) => {
  const { content } = req.body;
  const { commentID } = req.query;

  try {
    const comment = await Comments.findById(commentID);
    if (comment.commentor.toString() === userData.id) {
      comment.content = content;
      await comment.save();
      res.status(200).json({
        success: true,
        comment,
      });
    } else {
      res.status(401).json({
        success: false,
        message: "You are not authorized to edit this comment",
      });
    }
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

const deleteComment = async (req, res, userData) => {
  const { commentID } = req.query;

  try {
    const comment = await Comments.findById(commentID);
    if (comment.commentor.toString() === userData.id) {
      if (comment.parentComment) {
        await Comments.updateOne(
          { _id: comment.parentComment },
          { $pull: { replies: comment._id } }
        );
      }
      if (comment.replies.length > 0) {
        const replyIds = comment.replies.map((reply) => reply._id);
        await Comments.deleteMany({ _id: { $in: replyIds } });
      }
      await comment.deleteOne();
      res.status(200).json({
        success: true,
        message: "Comment deleted",
      });
    } else {
      res.status(401).json({
        success: false,
        message: "You are not authorized to delete this comment",
      });
    }
  } catch (error) {}
};

const reply = async (req, res, userData) => {
  const { content } = req.body;
  const { id, commentID } = req.query;

  try {
    const comment = await Comments.create({
      content,
      commentor: userData.id,
      postLink: id,
      parentComment: commentID,
    });

    console.log("Parent: " + comment.parentComment);
    await Comments.updateOne(
      { _id: commentID },
      { $push: { replies: comment._id } }
    );

    res.status(201).json({
      success: true,
      data: comment,
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export default async function handler(req, res) {
  await connectMongo();
  const session = await getServerSession(req, res, authOptions);

  switch (req.method) {
    case POST:
      await reply(req, res, session.user);
      break;
    case PUT:
      await updateComment(req, res, session.user);
      break;
    case DELETE:
      await deleteComment(req, res, session.user);
      break;
    default:
      res
        .status(404)
        .json({ success: false, message: "API endpoint not found" });
  }
}
