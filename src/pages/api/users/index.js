import connectMongo from "@/utils/db";
import User from "../../../models/User";

const signUp = async(req, res) => {
    const {name, username, email, password, dob} = req.body;
    try {
      // Create a new User document
      const user = new User({
        name,
        username,
        email,
        password,
        dob
      });

      // Save the User document to the database
      await user.save();
      res.status(201).json({ success: true, data: user });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
}

export default async function handler(req, res) {
  await connectMongo();
  if (req.method === "POST") {
    await signUp(req, res);
  } else {
    res.status(404).json({ success: false, message: "API endpoint not found" });
  }
}
