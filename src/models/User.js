import {Schema, model, models} from 'mongoose';

// Define the User schema
const userSchema = new Schema({
  name: {
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
  }
});

// Define the User model if it doesn't exist
const User = models.User || model('users', userSchema);

export default User;
