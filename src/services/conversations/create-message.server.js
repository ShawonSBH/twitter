import { createConversation } from "./createConversation";
import Conversations from "../../models/Conversations";
import { mapId } from "../../utils/mapId";

export async function createMessage({
  text,
  file,
  sender,
  receiver,
  originalMessage,
}) {
  try {
    const message = {
      content: {
        text,
        file,
      },
      sender,
      receiver,
      originalMessage,
    };
    const conversations = await Conversations.find({
      members: { $all: [sender, receiver] },
    })
      .sort({ createdAt: -1 })
      .limit(1);
    let conversation;
    if (!conversations || conversations.length === 0) {
      conversation = await createConversation(sender, receiver);
    } else {
      conversation = conversations[0];
    }
    let newMessage;
    if (conversation.messages.length < 50) {
      conversation.messages.push(message);
      conversation.lastMessage = {
        text,
        file,
        sender,
      };
      await conversation.save();
      newMessage = conversation.messages[conversation.messages.length - 1];
    } else {
      const newConversation = await createConversation(sender, receiver);
      newConversation.messages.push(message);
      newConversation.lastMessage = {
        text,
        file,
        sender,
      };

      await newConversation.save();
      newMessage = conversation.messages[conversation.messages.length - 1];
    }
    return mapId(newMessage._doc);
  } catch (error) {
    throw { status: 500, error: error.message };
  }
}
