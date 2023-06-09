import connectMongo from "@/utils/db";
import { GET, POST } from "@/utils/reqMethods";
import Users from "../../../models/Users";
import bcrypt from "bcrypt";

const signUp = async (req, res) => {
  const { name, username, email, password, dob } = req.body;
  //console.log(req.body);
  try {
    // Create a new Users document

    const hashedPassword = await bcrypt.hash(password, 12);

    //console.log(hashedPassword);

    const user = await Users.create({
      name,
      username,
      email,
      password: hashedPassword,
      dob,
    });

    res.status(201).json({ success: true, data: user });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const user = await Users.find({});
    res.status(200).json({ success: true, users: user });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export default async function handler(req, res) {
  await connectMongo();

  switch (req.method) {
    case POST:
      await signUp(req, res);
      break;
    case GET:
      await getAllUsers(req, res);
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
