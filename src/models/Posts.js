import mongoose, { model, models, Schema } from "mongoose";
import Users from "@/models/Users";
import Comments from "@/models/Comments";

const postSchema = new Schema(
  {
    content: String,
    image: String,
    comments: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Comments",
      },
    ],
    numberOfLikes: {
      type: Number,
      default: 0,
    },
    createdBy: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Users",
    },
  },
  { timestamps: true }
);

const Posts = models.Posts || model("Posts", postSchema);

export default Posts;
