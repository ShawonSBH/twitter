import Tweets from "@/models/Tweets";
import connectMongo from "@/utils/db";
import { DELETE, POST, PUT } from "@/utils/reqMethods";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import path from "path";
import formidable from "formidable";
import { error } from "console";
import { parseForm } from "../posts";

const FormidableError = formidable.errors.FormidableError;

export const config = {
  api: {
    bodyParser: false,
  },
};

const updateTweet = async (req, res, userData) => {
  console.log("Update Tweets Hit");
  const { tweetID } = req.query;
  try {
    const { fields, files } = await parseForm(req);
    const tweet = await Tweets.findById(tweetID);
    console.log(tweet);
    console.log(fields);
    const image = files.image ? "/uploads/" + files.image?.newFilename : null;
    const content = fields.content;
    const imageURL = fields.imageUrl;
    tweet.content = content;
    //console.log(image);
    if (image) {
      tweet.image = image;
    } else {
      if (imageURL == "null") {
        tweet.image = image;
      }
    }

    await tweet.save();

    await tweet.populate({
      path: "createdBy",
      select: {
        _id: 1,
        name: 1,
        username: 1,
        email: 1,
        profilePicture: 1,
      },
    });

    //console.log(tweet);
    res.status(201).json({
      success: true,
      tweet,
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

const retweet = async (req, res, userData) => {
  try {
    const { tweetID } = req.query;

    let existingTweet = await Tweets.findById(tweetID);

    if (existingTweet.typeOfTweet === "Retweet") {
      existingTweet = await Tweets.findById(existingTweet.originalTweetLink);
    }

    if (existingTweet.retweets.includes(userData.id)) {
      console.log("Already here");
      existingTweet.retweets.remove(userData.id);
      await existingTweet.save();
      const deletedTweet = await Tweets.findOneAndDelete({
        originalTweetLink: existingTweet,
        createdBy: userData.id,
        typeOfTweet: "Retweet",
      });
      res.status(200).json({
        success: true,
        message: "Retweet exists",
        deletedTweet,
      });
    } else {
      const newTweet = await Tweets.create({
        typeOfTweet: "Retweet",
        createdBy: userData.id,
        originalTweetLink: existingTweet._id,
      });

      existingTweet.retweets.push(userData.id);

      await existingTweet.save();

      const prevTweet = await newTweet.populate({
        path: "createdBy",
        select: {
          _id: 1,
          name: 1,
          username: 1,
          email: 1,
          profilePicture: 1,
        },
      });

      const tweet = await prevTweet.populate({
        path: "originalTweetLink",
        select: {
          createdBy: 1,
          comments: 1,
          likes: 1,
          retweets: 1,
          content: 1,
          image: 1,
        },
        populate: {
          path: "createdBy",
          select: {
            _id: 1,
            name: 1,
            username: 1,
            email: 1,
            profilePicture: 1,
          },
        },
      });

      res.status(201).json({
        success: true,
        message: "Retweet Successful",
        tweet,
      });
    }
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

const deleteTweet = async (req, res, userData) => {
  try {
    const { tweetID } = req.query;
    const tweet = await Tweets.findById(tweetID);

    await Tweets.deleteMany({ originalTweetLink: tweetID });
    await tweet.deleteOne();

    res.status(200).json({
      success: true,
      message: "Tweet deleted",
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export default async function handler(req, res) {
  await connectMongo();
  const session = await getServerSession(req, res, authOptions());

  switch (req.method) {
    case POST:
      await retweet(req, res, session.user);
      break;
    case PUT:
      await updateTweet(req, res, session.user);
      break;
    case DELETE:
      await deleteTweet(req, res, session.user);
      break;
    default:
      res
        .status(404)
        .json({ success: false, message: "API endpoint not found" });
  }
}
