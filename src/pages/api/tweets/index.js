import Tweets from "@/models/Tweets";
import connectMongo from "@/utils/db";
import { GET, POST } from "@/utils/reqMethods";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import path from "path";
import formidable from "formidable";
import { error } from "console";

const FormidableError = formidable.errors.FormidableError;

export const config = {
  api: {
    bodyParser: false,
  },
};

export const parseForm = async (req) => {
  return new Promise((resolve, reject) => {
    const form = new formidable.IncomingForm({
      uploadDir: path.join(process.cwd(), "public", "uploads"),
      keepExtensions: true,
    });
    form.parse(req, function (err, fields, files) {
      if (err) {
        console.log(err);
        return reject(err);
      }
      resolve({ fields, files });
    });
  });
};

const createTweet = async (req, res, session) => {
  console.log("Create Tweets Hit");
  try {
    const { fields, files } = await parseForm(req);
    console.log(fields);
    const image = files.image ? "/uploads/" + files.image?.newFilename : null;
    const content = fields.content;
    const typeOfTweet = fields.typeOfTweet;

    console.log(image, content);

    const createdTweet = await Tweets.create({
      image,
      content,
      typeOfTweet,
      createdBy: session.user.id,
    });

    const tweet = await createdTweet.populate({
      path: "createdBy",
      select: {
        _id: 1,
        name: 1,
        username: 1,
        email: 1,
        profilePicture: 1,
      },
    });

    console.log(tweet);
    res.status(201).json({
      success: true,
      tweet,
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

const getAllTweets = async (req, res) => {
  try {
    const tweets = await Tweets.find({ typeOfTweet: { $ne: "Comment" } })
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
      })
      .populate({
        path: "comments",
        options: { sort: { createdAt: -1 } },
        populate: [
          {
            path: "createdBy",
            select: {
              _id: 1,
              name: 1,
              username: 1,
              email: 1,
              profilePicture: 1,
            },
          },
          {
            path: "comments",
            options: { sort: { createdAt: -1 } },
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
          },
        ],
      });
    // Tweets.sort(-1);
    res.status(200).json({
      success: true,
      tweets,
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export default async function handler(req, res) {
  await connectMongo();
  const session = await getServerSession(req, res, authOptions);

  switch (req.method) {
    case GET:
      await getAllTweets(req, res);
      break;
    case POST:
      await createTweet(req, res, session);
      break;
    default:
      res
        .status(404)
        .json({ success: false, message: "API endpoint not found" });
  }
}
