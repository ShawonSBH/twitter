import Conversations from "../../models/Conversations";

export async function seeMessage({ messageIds }) {
  console.log("Message Load: " + messageIds);
  try {
    await Conversations.updateMany(
      {
        "messages._id": { $in: messageIds },
      },
      {
        $set: { "messages.$.seen": true },
      }
    );
    return true;
  } catch (err) {
    return false;
  }
}
