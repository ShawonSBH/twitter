import mongoose, { Schema, model, models } from "mongoose";

const messageSchema = new Schema(
  {
    content: {
      type: Object,
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
    originalMessageLink: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Messages",
    },
  },
  { timestamps: true }
);

const Messages = models.Messages || model("Messages", messageSchema);

export default Messages;
