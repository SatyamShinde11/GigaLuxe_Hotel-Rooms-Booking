import mongoose from "mongoose";

const BookingSchema = mongoose.Schema(
  {
    Price: {
      type: Number,
      required: true,
    },
    CheckIn: {
      type: String,
      required: true,
    },
    CheckOut: {
      type: String,
      required: true,
    },
    Status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
      required: true,
    },
    User: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    Room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Rooms",
      required: true,
    },
    RazorpayPaymentId: {
      type: String,
      required: true,
    },
    RazorpayOrderId: {
      type: String,
      required: true,
    },
    RazorpaySignature: {
      type: String,
      required: true,
    },
    ReceiptId: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

const Bookings = mongoose.model("Bookings", BookingSchema);
export default Bookings;
