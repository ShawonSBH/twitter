import Comments from "@/models/Comments";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import connectMongo from "@/utils/db";
import { POST } from "@/utils/reqMethods";
import { getServerSession } from "next-auth";

const reply = async (req, res) => {
  const { content, userID } = req.body;
  const { id, commentID } = req.query;

  try {
    const comment = await Comments.create({
      content,
      commentor: userID,
      postLink: id,
    });

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
  // const session = getServerSession(req, res, authOptions);

  switch (req.method) {
    case POST:
      await reply(req, res);
      break;
    default:
      res
        .status(404)
        .json({ success: false, message: "API endpoint not found" });
  }
}
