import mongoose, { model, models, Schema } from "mongoose";
import Users from "@/models/Users";

const tweetSchema = new Schema(
  {
    content: String,
    image: String,
    comments: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Tweets",
      },
    ],
    likes: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Users",
      },
    ],
    numberOfRetweets: {
      type: Number,
      default: 0,
    },
    typeOfTweet: String,
    originalTweetLink: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Tweets",
    },
    createdBy: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Users",
    },
  },
  { timestamps: true }
);

const Tweets = models.Tweets || model("Tweets", tweetSchema);

export default Tweets;
