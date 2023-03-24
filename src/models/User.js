import {Schema, model, models} from 'mongoose';

// Define the User schema
const userSchema = new Schema({
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
  }
});

// Define the User model if it doesn't exist
const User = models.User || model('users', userSchema);

export default User;
