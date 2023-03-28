import Comments from "@/models/Comments";
import Posts from "@/models/Posts";
import connectMongo from "@/utils/db";
import { POST } from "@/utils/reqMethods";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";

const comment = async (req, res, user) => {
  const { content } = req.body;
  const { id } = req.query;
  try {
    const comment = await Comments.create({
      content,
      commentor: user.id,
      postLink: id,
    });

    await Posts.updateOne({ _id: id }, { $push: { comments: comment._id } });

    res.status(201).json({
      success: true,
      data: comment,
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
      await comment(req, res, session.user);
      break;
    default:
      res
        .status(404)
        .json({ success: false, message: "API endpoint not found" });
  }
}
