import mongoose, { model, models, Schema } from "mongoose";
import Users from "@/models/Users";
import Posts from "./Posts";

const commentSchema = new Schema(
  {
    content: String,
    replies: [
      {
        type: mongoose.SchemaType.ObjectId,
        ref: "Comments",
      },
    ],
    numberOfLikes: {
      type: Number,
      default: 0,
    },
    commentor: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Users",
    },
    postLink: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Posts",
    },
  },
  { timestamps: true }
);

const Comments = models.Comments || model("Comments", commentSchema);

export default Comments;
