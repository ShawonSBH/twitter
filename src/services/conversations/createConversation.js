import Conversations from "../../models/Conversations";

export async function createConversation(userID, receiverID) {
  try {
    const members = [userID, receiverID];
    const messages = [];

    const conversation = await Conversations.create({
      members,
      messages,
    });

    return conversation;
  } catch (error) {
    throw { status: 500, error: error.message };
  }
}
