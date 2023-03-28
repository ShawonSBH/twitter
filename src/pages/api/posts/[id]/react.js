import Comments from "@/models/Comments";
import Posts from "@/models/Posts";
import Reacts from "@/models/Reacts";
import connectMongo from "@/utils/db";
import { POST } from "@/utils/reqMethods";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";

const react = async (req, res, user) => {
  const { id } = req.query;
  try {
    const react = await Reacts.findOne({ postLink: id, reactor: user.id });
    console.log(react);
    if (react) {
      console.log("first");
      await react.deleteOne();

      await Posts.updateOne({ _id: id }, { $pull: { likes: react._id } });

      res.status(201).json({
        success: true,
        message: "React Delted to this post",
      });
    } else {
      console.log("second");
      const newReact = await Reacts.create({
        reactor: user.id,
        postLink: id,
      });
      console.log(newReact);
      await Posts.updateOne({ _id: id }, { $push: { likes: newReact._id } });

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
