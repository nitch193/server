import mongoose from "mongoose";

const { Schema } = mongoose;
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    minlength: [5, "username must be 5 or more characters"],
  },
  password: {
    type: String,
    required: true,
    minlength: [8, "passwprd must be 8 or more characters"],
  },
  email: {
    type: String,
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

const User = mongoose.model("User", userSchema);

export default User;
