import mongoose from "mongoose";

const OtpSchema = new mongoose.Schema(
  {
    otp: {
      unique: true,
      required: true,
      type: Number,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },

  },
  { timestamps: true }
);

const Otp = mongoose.model("Otp", OtpSchema);
export default Otp;
