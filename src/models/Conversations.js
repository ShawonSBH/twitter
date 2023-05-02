import mongoose, { model, models, Schema, SchemaTypes } from "mongoose";

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
        content: {
          text: String,
          file: String,
        },
        sender: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Users",
        },
        receiver: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Users",
        },
        senderReact: {
          type: String,
          enum: ["none", "like", "haha", "love", "sad", "angry"],
          default: "none",
        },
        receiverReact: {
          type: String,
          enum: ["none", "like", "haha", "love", "sad", "angry"],
          default: "none",
        },
        seen: {
          type: Boolean,
          default: false,
        },
        originalMessage: {
          id: String,
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
        type: Schema.Types.ObjectId,
        ref: "Users",
      },
    },
  },
  { timestamps: true }
);

const Conversations =
  models.Conversations || model("Conversations", conversationSchema);

export default Conversations;
