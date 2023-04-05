import mongoose, { model, models, Schema } from "mongoose";
import Users from "@/models/Users";
import Posts from "@/models/Posts";

const commentSchema = new Schema(
  {
    content: String,
    replies: [
      {
        type: mongoose.SchemaTypes.ObjectId,
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
    parentComment: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Comments",
    },
  },
  { timestamps: true }
);

const Comments = models.Comments || model("Comments", commentSchema);

export default Comments;
