import connectMongo from "@/utils/db";
import { DELETE, GET, POST, PUT } from "@/utils/reqMethods";
import Users from "@/models/Users";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";
import { parseForm } from "../../posts";

export const config = {
  api: {
    bodyParser: false,
  },
};

const getUserByID = async (req, res) => {
  try {
    const { userID } = req.query;
    const user = await Users.findById(userID)
      .populate({
        path: "followers",
        select: {
          _id: 1,
          name: 1,
          username: 1,
          profilePicture: 1,
        },
      })
      .populate({
        path: "following",
        select: {
          _id: 1,
          name: 1,
          username: 1,
          profilePicture: 1,
        },
      });

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

const followUser = async (req, res, currentUser) => {
  try {
    const { userID } = req.query;
    if (currentUser.id.toString() !== userID) {
      await Users.updateOne(
        { _id: userID },
        { $push: { followers: currentUser.id } }
      );
      await Users.updateOne(
        { _id: currentUser.id },
        { $push: { following: userID } }
      );
      res.status(200).json({
        success: true,
        message: `You started following ${userID}`,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "You can't follow yourself",
      });
    }
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { fields, files } = await parseForm(req);
    const { userID } = req.query;
    const profilePicture = files.profilePicture
      ? "/uploads/" + files.profilePicture?.newFilename
      : null;
    const name = fields.name;
    const username = fields.username;

    console.log(name, username, profilePicture);

    const user = await Users.findById(userID);

    user.name = name;
    user.username = username;
    user.profilePicture = profilePicture;

    await user.save();

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

const unfollowUser = async (req, res, currentUser) => {
  try {
    const { userID } = req.query;
    if (currentUser.id.toString() !== userID) {
      await Users.updateOne(
        { _id: userID },
        { $pull: { followers: currentUser.id } }
      );
      await Users.updateOne(
        { _id: currentUser.id },
        { $pull: { following: userID } }
      );
      res.status(200).json({
        success: true,
        message: `You unfollowed ${userID}`,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "You can't unfollow yourself",
      });
    }
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export default async function handler(req, res) {
  await connectMongo();
  const session = await getServerSession(req, res, authOptions);

  switch (req.method) {
    case GET:
      await getUserByID(req, res);
      break;
    case POST:
      await followUser(req, res, session.user);
      break;
    case PUT:
      await updateUser(req, res);
      break;
    case DELETE:
      await unfollowUser(req, res, session.user);
      break;
    default:
      res
        .status(404)
        .json({ success: false, message: "API endpoint not found" });
  }
}
