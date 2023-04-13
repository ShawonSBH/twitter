import Conversations from "@/models/Conversations";
import Users from "@/models/Users";
import connectMongo from "@/utils/db";
import { POST } from "@/utils/reqMethods";

const createConversation = async () => {
  try {
    const { senderID, receiverID } = req.body;
    const members = [senderID, receiverID];
    const messages = [];

    const conversation = await Conversations.create({
      members,
      messages,
    });

    res.status(201).json({
      success: true,
      conversation,
    });
  } catch (error) {}
};

const getAllConversations = async () => {
  try {
    const { userID } = req.body;
    const user = await Conversations.find({}).populate({
      path: "members",
      select: {
        name: 1,
        username: 1,
        email: 1,
        profilePicture: 1,
      },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export default async function handler(req, res) {
  await connectMongo();

  switch (req.method) {
    case POST:
      await createConversation(req, res);
      break;
    case GET:
      await getAllConversations(req, res);
      break;
    default:
      res
        .status(404)
        .json({ success: false, message: "API endpoint not found" });
  }
}
