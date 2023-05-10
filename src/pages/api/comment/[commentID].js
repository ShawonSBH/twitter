import Posts from "@/models/Posts";
import connectMongo from "@/utils/db";
import { DELETE } from "@/utils/reqMethods";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import Tweets from "@/models/Tweets";

const deleteComment = async (req, res, userData) => {
  try {
    const { commentID } = req.query;
    const deletedComment = await Tweets.findById(commentID);

    if (userData.id.toString() === deletedComment.createdBy.toString()) {
      await Tweets.updateOne(
        { _id: deletedComment.originalTweetLink },
        { $pull: { comments: deletedComment._id } }
      );

      if (deletedComment.comments.length > 0) {
        const replyIds = deletedComment.comments.map((reply) => reply._id);
        await Tweets.deleteMany({ _id: { $in: replyIds } });
      }

      await deletedComment.deleteOne();

      res.status(201).json({
        success: true,
        message: "Comment deleted Successfully",
      });
    } else {
      res.status(403).json({
        success: false,
        message: "Not Authorized",
      });
    }
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export default async function handler(req, res) {
  await connectMongo();
  const session = await getServerSession(req, res, authOptions());

  switch (req.method) {
    case DELETE:
      await deleteComment(req, res, session.user);
      break;
    default:
      res
        .status(404)
        .json({ success: false, message: "API endpoint not found" });
  }
}
