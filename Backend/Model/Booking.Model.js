import mongoose from "mongoose";

const BookingSchema = mongoose.Schema(
  {
    price: {
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
  },
  { timestamps: true }
);

const Bookings = mongoose.model("Bookings", BookingSchema);
export default Bookings;
