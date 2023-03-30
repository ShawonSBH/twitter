import Reacts from "@/models/Reacts";
import connectMongo from "@/utils/db";
import { GET } from "@/utils/reqMethods";

const getAllLikedPosts = async (req, res) => {
  const { userID } = req.query;
  try {
    const allLikedPosts = await Reacts.find({ reactor: userID });
    res.status(200).json({
      success: true,
      data: allLikedPosts,
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export default async function handler(req, res) {
  await connectMongo();

  switch (req.method) {
    case GET:
      await getAllLikedPosts(req, res);
      break;
    default:
      res
        .status(404)
        .json({ success: false, message: "API endpoint not found" });
  }
}
