import Comments from "@/models/Comments";
import connectMongo from "@/utils/db";
import { POST } from "@/utils/reqMethods";
import { getServerSession } from "next-auth";
import Tweets from "@/models/Tweets";
import { authOptions } from "../auth/[...nextauth]";

const react = async (req, res, user) => {
  const { tweetID } = req.body;
  try {
    const react = await Tweets.findOne({
      _id: tweetID,
      likes: { $elemMatch: { $eq: user.id } },
    });
    console.log(react);
    if (react) {
      await Tweets.updateOne({ _id: tweetID }, { $pull: { likes: user.id } });

      res.status(201).json({
        success: true,
        message: "React Deleted to this post",
      });
    } else {
      console.log("second");
      await Tweets.updateOne({ _id: tweetID }, { $push: { likes: user.id } });

      res.status(201).json({
        success: true,
        message: "Reacted to this post",
      });
    }
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

export default async function handler(req, res) {
  await connectMongo();
  const session = await getServerSession(req, res, authOptions());

  switch (req.method) {
    case POST:
      await react(req, res, session.user);
      break;
    default:
      res
        .status(404)
        .json({ success: false, message: "API endpoint not found" });
  }
}
