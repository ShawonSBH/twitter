import mongoose, { Schema, SchemaTypes } from "mongoose";
import { v4 as uuidv4 } from "uuid";

const conversationSchema = new Schema(
  {
    members: [
      {
        type: SchemaTypes.ObjectId,
        ref: "Users",
      },
    ],
    messages: [
      {
        msgID: {
          type: String,
          default: uuidv4,
        },
        content: {
          text: String,
          file: String,
        },
        sender: {
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
    lastMessage: {
      text: String,
      file: String,
      sender: {
        type: SchemaTypes.ObjectId,
        ref: "Users",
      },
    },
  },
  { timestamps: true }
);

const Conversations =
  models.Conversations || model("Conversations", conversationSchema);

export default Conversations;
