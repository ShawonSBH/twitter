import mongoose, { model, models, Schema } from "mongoose";
import Users from "@/models/Users";
import Posts from "@/models/Posts";

const reactSchema = new Schema(
  {
    content: String,
    reactor: {
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

const Reacts = models.Reacts || model("Reacts", reactSchema);

export default Reacts;
