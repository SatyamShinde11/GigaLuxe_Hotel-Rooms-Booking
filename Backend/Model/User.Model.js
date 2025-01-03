import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      required: true,
      type: String,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      required: true,
      type: String,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    VerificationCode: String,
  },
  { timestamps: true }
);

const Users = mongoose.model("Users", userSchema);
export default Users;
