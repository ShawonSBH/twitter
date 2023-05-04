import Conversations from "../../models/Conversations";
import { mapId } from "../../utils/mapId";
import mongoose from "mongoose";
import { seeMessage } from "./seeMessage.server";

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
    let messages = await Conversations.aggregate([
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

    let unseenMessages = [];
    messages =
      messages?.map((msg) => {
        if (!msg.seen && msg.sender.toString() === receiverID.toString()) {
          unseenMessages.push(msg._id);
          msg.seen = true;
        }
        return mapId(msg);
      }) || [];

    if (unseenMessages.length != 0) {
      seeMessage({ messageIds: unseenMessages });
    }
    //console.log(messages);
    return messages;
    //console.log(conversations);
  } catch (error) {
    throw { status: 500, message: error.message };
  }
}
