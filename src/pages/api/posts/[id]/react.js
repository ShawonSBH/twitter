import Comments from "@/models/Comments";
import Posts from "@/models/Posts";
import connectMongo from "@/utils/db";
import { POST } from "@/utils/reqMethods";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";

const react = async (req, res, user) => {
  const { id } = req.query;
  try {
    await Posts.updateOne({ _id: id }, { $push: { comments: comment._id } });

    res.status(201).json({
      success: true,
      message: "Reacted to this post",
    });
  } catch (err) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export default async function handler(req, res) {
  await connectMongo();
  const session = await getServerSession(req, res, authOptions);

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
