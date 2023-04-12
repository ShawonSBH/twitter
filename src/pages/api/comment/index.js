import Posts from "@/models/Posts";
import connectMongo from "@/utils/db";
import { GET, POST, PUT } from "@/utils/reqMethods";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
// import path from "path";
// import formidable from "formidable";
// import { parseForm } from "@/utils/formParser";
import Tweets from "@/models/Tweets";

//const FormidableError = formidable.errors.FormidableError;

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

const createPost = async (req, res, session) => {
  try {
    // const { fields, files } = await parseForm(req);
    // console.log(fields);
    // const image = files.image ? "/uploads/" + files.image?.newFilename : null;
    // const content = fields.content;
    // const typeOfTweet = fields.typeOfTweet;
    // const originalTweetLink = fields.originalTweetLink;

    //console.log(image, content);
    const { content, typeOfTweet, originalTweetLink } = req.body;

    const createdComment = await Tweets.create({
      content,
      typeOfTweet,
      originalTweetLink,
      createdBy: session.user.id,
    });

    await Tweets.updateOne(
      { _id: originalTweetLink },
      { $push: { comments: createdComment._id } }
    );

    const comment = await createdComment.populate({
      path: "createdBy",
      select: {
        _id: 1,
        name: 1,
        username: 1,
        email: 1,
        profilePicture: 1,
      },
    });

    console.log(comment);
    res.status(201).json({
      success: true,
      comment,
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

const updateComment = async (req, res, userData) => {
  console.log("Update Comments Hit");
  try {
    // const { fields, files } = await parseForm(req);
    // console.log(fields);
    // const image = files.image ? "/uploads/" + files.image?.newFilename : null;
    // const content = fields.content;
    // const typeOfTweet = fields.typeOfTweet;
    // const originalTweetLink = fields.originalTweetLink;

    //console.log(image, content);
    const { content, commentID } = req.body;

    const existingComment = await Tweets.findById(commentID);

    existingComment.content = content;

    await existingComment.save();

    const comment = await existingComment.populate({
      path: "createdBy",
      select: {
        _id: 1,
        name: 1,
        username: 1,
        email: 1,
        profilePicture: 1,
      },
    });

    console.log(comment);
    res.status(201).json({
      success: true,
      comment,
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const posts = await Posts.find({})
      .sort({ createdAt: -1 })
      .populate({
        path: "createdBy",
        select: {
          _id: 1,
          name: 1,
          username: 1,
          email: 1,
          profilePicture: 1,
        },
      });
    // posts.sort(-1);
    res.status(200).json({
      success: true,
      posts,
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
      await createPost(req, res, session);
      break;
    case PUT:
      await updateComment(req, res, session.user);
      break;
    default:
      res
        .status(404)
        .json({ success: false, message: "API endpoint not found" });
  }
}
