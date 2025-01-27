import Rooms from "../Model/Room.Model.js";
import Users from "../Model/User.Model.js";
import Bookings from "../Model/Booking.Model.js";
import fs from "fs";
import RazorpayInstance from "../Config/Razorpay.js";
import crypto from "crypto";

// Rooms Controllers
export const CreateRoom = async (req, res) => {
  try {
    console.log("Upload Folder:", req.uploadFolder);

    const {
      name,
      description,
      price,
      man,
      kids,
      bedType,
      features,
      roomType,
      roomSize,
      roomFlour,
      roomNumber,
      roomLocation,
    } = req.body;

    if (
      !name ||
      !description ||
      !price ||
      !man ||
      !kids ||
      !bedType ||
      !features ||
      !roomType ||
      !roomSize ||
      !roomFlour ||
      !roomNumber ||
      !roomLocation
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the fields",
      });
    }

    const roomData = {
      name,
      description,
      price,
      man,
      kids,
      bedType,
      features: features.split(","),
      roomType,
      roomSize,
      roomFlour,
      roomNumber,
      roomLocation,
      mainRoomImage: req.body.mainRoomImage,
      roomImages: req.body.roomImages,
    };

    if (req.uploadFolder) {
      fs.rmSync(req.uploadFolder, { recursive: true, force: true });
    }

    const room = await Rooms.create(roomData);
    return res.status(201).json({
      success: true,
      message: "Room created successfully",
      room,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create room",
      error,
    });
  }
};

export const GetRooms = async (req, res) => {
  try {
    const rooms = await Rooms.find();

    if (rooms.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Rooms not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Rooms found successfully",
      rooms,
    });
  } catch (error) {
    console.error("Error fetching rooms:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch rooms",
      error: error.message,
    });
  }
};

export const EditRoom = async (req, res) => {
  try {
    const { id } = req.body.Data;
    if (!id) {
      return res.status(400).json({ message: "Room ID is required" });
    }

    const room = await Rooms.findById(id);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    const updatedRoom = await Rooms.findByIdAndUpdate(
      id,
      { $set: req.body.Data },
      { new: true }
    );
    if (!updatedRoom) {
      return res.status(500).json({ message: "Failed to update room" });
    }

    res
      .status(200)
      .json({ message: "Room updated successfully", data: updatedRoom });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};

// Booking Controllers

export const GetBookings = (req, res) => {
  try {
  } catch (error) {
    res.status(500);
  }
};

export const CreateBooking = async (req, res) => {
  try {
    const { roomId, Price, CheckIn, CheckOut } = req.body?.data || {};
    const { Token } = req;

    if (!roomId || !Price || !CheckIn || !CheckOut || !Token) {
      return res.status(400).json({
        message:
          "All fields (roomId, Price, CheckIn, CheckOut, Token) are required.",
        success: false,
      });
    }
    console.log(Token);
    const room = await Rooms.findById(roomId);
    const user = await Users.findOne({ email: Token });
    if (!room) {
      return res
        .status(404)
        .json({ message: "Room not found", success: false });
    }
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    const VerifyBooking = await Bookings.findOne({ CheckOut, CheckIn });

    if (VerifyBooking) {
      return res
        .status(400)
        .json({ message: "Booking already exists", success: false });
    }
    if (room.price !== Price) {
      return res
        .status(400)
        .json({ message: "Price mismatch", success: false });
    }
    const amount = (Price + Price * 0.1).toFixed(2);
    console.log(amount);

    const options = {
      amount: Math.round(amount * 100),
      currency: "INR",
      receipt: crypto.randomBytes(8).toString("hex"),
    };

    const order = await RazorpayInstance.orders.create(options);
    return res.status(200).json({
      message: "Order created successfully",
      data: order,
      key_id: process.env.RAZORPAY_API_KEY,
      roomId,
      Token,
      success: true,
    });
  } catch (error) {
    console.error("CreateBooking error:", error);
    return res.status(500).json({
      message: "Failed to create booking",
      error: error.message,
      success: false,
    });
  }
};

export const EditBooking = (req, res) => { };


export const VerifyBooking = async (req, res) => {
  try {
    console.log("Received request:", req.body);

    const secret = process.env.RAZORPAY_SECRET_KEY;

    const { CheckIn, CheckOut, response, PaymentVerificationData } =
      req.body?.InputData || {};
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      response || {};
    const { amount, roomId, Token, receipt } = PaymentVerificationData || {};

    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature ||
      !CheckIn ||
      !CheckOut ||
      !roomId ||
      !Token ||
      !amount ||
      !receipt
    ) {
      return res.status(400).json({
        message: "Missing required parameters",
        success: false,
      });
    }

    const shasum = crypto.createHmac("sha256", secret);
    shasum.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    if (shasum.digest("hex") !== razorpay_signature) {
      return res.status(400).json({
        message: "Signature mismatch",
        success: false,
      });
    }

    const room = await Rooms.findById(roomId);
    const user = await Users.findOne({ email: Token });
    if (!room || !user) {
      return res.status(404).json({
        message: room ? "User not found" : "Room not found",
        success: false,
      });
    }

    const existingBooking = await Bookings.findOne({
      CheckIn,
      CheckOut,
      Room: roomId,
    });
    if (existingBooking) {
      return res.status(400).json({
        message: "Booking already exists for the selected dates",
        success: false,
      });
    }

    const booking = await Bookings.create({
      Price: amount / 100,
      CheckIn,
      CheckOut,
      Status: "Approved",
      User: user._id,
      Room: room._id,
      RazorpayPaymentId: razorpay_payment_id,
      RazorpayOrderId: razorpay_order_id,
      RazorpaySignature: razorpay_signature,
      ReceiptId: receipt,
    });

    await room.updateOne({ $push: { isBookingDate: { CheckIn, CheckOut } } });
    await user.updateOne({ $push: { BookedRooms: {  RoomId: room._id } } });

    const responseData = {
      ...booking._doc,
      RoomName: room.name,
      UserName: user.name,
      UserEmail: user.email,
      UserPhone: user.phoneNumber,
    };

    return res.status(200).json({
      message: "Booking created successfully!",
      data: responseData,
      success: true,
    });
  } catch (error) {
    console.error("Error in VerifyBooking:", error);
    return res.status(500).json({
      message: "Error verifying payment",
      error: error.message,
      success: false,
    });
  }
};
