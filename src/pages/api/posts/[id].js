import Posts from "@/models/Posts";
import connectMongo from "@/utils/db";
import { GET } from "@/utils/reqMethods";
import Users from "@/models/Users";

const getPost = async (req, res) => {
  const { id } = req.query;
  console.log(id);
  try {
    const post = await Posts.findById(id).populate({
      path: "createdBy",
      select: { password: 0, dob: 0, followers: 0 },
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

  switch (req.method) {
    case GET:
      await getPost(req, res);
      break;
    default:
      res
        .status(404)
        .json({ success: false, message: "API endpoint not found" });
  }
}
