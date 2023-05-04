import Conversations from "../../models/Conversations";
import { mapId } from "../../utils/mapId";
import mongoose from "mongoose";

export async function getAllConversationsByUser({
  userId,
  receiverID,
  pageIndex,
  pageSize = 30,
}) {
  try {
    const objectIdUserId = new mongoose.Types.ObjectId(userId);
    const objectIdReceiverId = new mongoose.Types.ObjectId(receiverID);
    // const conversations = await Conversations.find({
    //   members: { $all: [userId, receiverID] },
    // });
    // console.log(conversations);
    const messages = await Conversations.aggregate([
      { $match: { members: { $all: [objectIdUserId, objectIdReceiverId] } } },
      { $unwind: "$messages" },
      {
        $project: {
          _id: 0,
          message: "$messages",
        },
      },
      { $sort: { "message.createdAt": -1 } },
      { $skip: (pageIndex - 1) * pageSize },
      { $limit: pageSize },
      { $replaceRoot: { newRoot: "$message" } },
    ]);
    //console.log(messages);
    return messages?.map((msg) => mapId(msg)) || [];
    //console.log(conversations);
  } catch (error) {
    throw { status: 500, message: error.message };
  }
}
