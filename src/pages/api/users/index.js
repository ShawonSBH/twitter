import connectMongo from "@/utils/db";
import User from "../../../models/User";

export default async function handler(req, res) {
  const {name, email, password} = req.body;
  await connectMongo();
  if (req.method === "POST") {
    try {
      // Create a new User document
      const user = new User({
        name,
        email,
        password,
      });

      // Save the User document to the database
      await user.save();
      res.status(201).json({ success: true, data: user });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  } else {
    res.status(404).json({ success: false, message: "API endpoint not found" });
  }
}
