import mongoose from 'mongoose';

// Define the User schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  dob: {
    type: Date,
    required: true
  },
  followers: {
    type: Number,
    default: 0
  },
  profilePicture: {
    type: String,
    default: ""
  },
});

// Define the User model if it doesn't exist
const User = mongoose.models.User || mongoose.model('users', userSchema);

export default User;