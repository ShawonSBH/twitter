import { Schema, SchemaTypes } from "mongoose";

const conversationSchema = new Schema({
  members: [
    {
      type: SchemaTypes.ObjectId,
      ref: "Users",
    },
  ],
  messages: [
    {
      content: {
        text: String,
        file: String,
      },
      sender: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Users",
      },
      receiver: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Users",
      },
      senderReact: String,
      receiverReact: String,
      originalMessage: {
        text: String,
        file: String,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

const Conversations =
  models.Conversations || model("Conversations", conversationSchema);

export default Conversations;
