import connectMongo from "@/utils/db";
import { POST } from "@/utils/reqMethods";
import Users from "../../../models/Users";
import bcrypt from "bcrypt";
import mongoose from "mongoose";

const logIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Create a new Users document
    const user = await Users.findOne({ email });

    console.log(mongoose.connection.models)
    // console.log(user);
    if (user) {
      //console.log(password, user.password);
      const passwordMatching = await bcrypt.compare(password, user.password);
      if (passwordMatching) {
        res.status(200).json({
          success: true,
          message: "Logged In",
          user,
        });
      } else {
        res.status(400).json({
          success: false,
          message: "Wrong Password",
        });
      }
    } else {
      res.status(400).json({
        success: false,
        message: "No such user",
      });
    }
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export default async function handler(req, res) {
  await connectMongo();

  switch (req.method) {
    case POST:
      await logIn(req, res);
      break;
    default:
      res
        .status(404)
        .json({ success: false, message: "API endpoint not found" });
  }
  // if (req.method === 'POST') {
  //   await signUp(req,res);
  // } else {
  //   res.status(404).json({ success: false, message: 'API endpoint not found' });
  // }
}
