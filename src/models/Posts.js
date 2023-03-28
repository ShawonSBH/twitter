import mongoose, { model, models, Schema } from "mongoose";
import Users from "@/models/Users";
import Comments from "@/models/Comments";
import Reacts from "./Reacts";

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
    likes: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Reacts",
      },
    ],
    createdBy: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Users",
    },
  },
  { timestamps: true }
);

const Posts = models.Posts || model("Posts", postSchema);

export default Posts;
