import mongoose from "mongoose";

// Define the Users schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    dob: {
      type: Date,
      required: true,
    },
    followers: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Users",
      },
    ],
    following: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Users",
      },
    ],
    profilePicture: {
      type: String,
      default: "/users.png",
    },
    messageNotifications: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Users",
      },
    ],
  },
  { timestamps: true }
);

// Define the Users model if it doesn't exist
const Users = mongoose.models.Users || mongoose.model("Users", userSchema);

export default Users;
