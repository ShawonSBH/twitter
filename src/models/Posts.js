import mongoose, { model, models, Schema } from "mongoose";

const postSchema = new Schema(
  {
    content: String,
    image: String,
    numberOfComments: {
      type: Number,
      default: 0,
    },
    numberOfLikes: {
      type: Number,
      default: 0,
    },
    createdBy: {
      id: mongoose.SchemaTypes.ObjectId,
      name: String,
      username: String,
      email: String,
      profilePicture: String,
    },
  },
  { timestamps: true }
);

const Posts = models.Posts || model("Posts", postSchema);

export default Posts;
