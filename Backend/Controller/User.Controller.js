import Users from "../Model/User.Model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Otp from "../Model/Otp.Model.js";
import {
  SendInvoice,
  SendVerificationCode,
  WelcomeEmail,
} from "../Config/Email.js";

export const UserIsAvailable = async (req, res) => {
  try {
    const { Token } = req;
    console.log(Token);

    if (!Token) {
      return res.status(400).json({
        message: "Token is required!",
        success: false,
      });
    }

    const email = Token;

    const existingUser = await Users.findOne({ email });

    if (!existingUser) {
      return res.status(404).json({
        message: "User does not exist with this email.",
        success: false,
      });
    }

    const User = {
      email: existingUser.email,
      name: existingUser.name,
      location: existingUser.location,
      phoneNumber: existingUser.phoneNumber
        ? existingUser.phoneNumber
        : "Not Provided",
      BookedRooms: existingUser.BookedRooms,
      InvoiceData: existingUser.InvoiceData,
    };

    return res.status(200).json({
      message: "Email verified successfully.",
      User,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server error.",
      error: error.message,
      success: false,
    });
  }
};

export const SendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        message: "Email is required!",
        success: false,
      });
    }

    const existingUser = await Users.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists with this email.",
        success: false,
      });
    }

    const verificationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    const newOtp = await Otp.create({
      email,
      otp: verificationCode,
    });

    await SendVerificationCode(newOtp.email, verificationCode);

    return res.status(200).json({
      message: "OTP sent successfully to your email.",
      success: true,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: "Server error. Please try again later.",
      success: false,
    });
  }
};

export const VerifyEmail = async (req, res) => {
  try {
    const { code, email, password, name, location, phoneNumber } = req.body;
    console.log(code);

    if (!email || !password || !name || !location || !phoneNumber || !code) {
      return res.status(400).json({
        message: "All fields are required!",
        success: false,
      });
    }

    const otpRecord = await Otp.findOne({ email });
    console.log(otpRecord);

    if (!otpRecord) {
      return res.status(400).json({
        message: "Invalid OTP. Not Enter Proper Email !",
      });
    }
    if (otpRecord.otp !== Number(code)) {
      return res.status(400).json({
        message: "Invalid OTP. Please try again.",
        success: false,
      });
    }

    await Otp.deleteOne({ email });

    const hashedPassword = await bcrypt.hash(password, 10);
    const Token = await jwt.sign(
      { data: email },
      process.env.JWT_SECRET || "GigaLuxe"
    );

    const newUser = await Users.create({
      email,
      name,
      Token,
      phoneNumber,
      password: hashedPassword,
      location,
    });

    if (newUser) {
      await WelcomeEmail(email, name);
    }

    res.cookie("authToken", Token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      message: "User Verify And  created successfully!",
      name,
      Token,
      email,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server error. Please try again later.",
      success: false,
    });
  }
};

export const SignIN = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required!", success: false });
    }

    const user = await Users.findOne({ email });
    console.log(user.Token);

    if (!user) {
      return res
        .status(404)
        .json({ message: "User is Not Found!", success: false });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ message: "Invalid credentials.", success: false });
    }

    const Token = user.Token;

    return res.status(200).json({
      message: "Login successful!",
      name: user.name,
      email: user.email,
      Token,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server error.", error: error.message, success: false });
  }
};

export const LogOut = (req, res) => {
  try {
    res.clearCookie("authToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return res
      .status(200)
      .json({ message: "Logout successful!", success: true });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server error.", error: error.message, success: false });
  }
};

export const GetAllUser = async (req, res) => {
  try {
    const userData = await Users.find();
    // console.log(userData);

    if (!userData) {
      return res.status(404).json({
        message: "User not found.",
        success: false,
      });
    }
    return res.status(200).json({
      message: "User found successfully.",
      userData,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error. Please try again later.",
      error: error.message,
      success: false,
    });
  }
};

export const InvoiceData = async (req, res) => {
  try {
    console.log(req.body);
    const {
      Price,
      CheckIn,
      CheckOut,
      RoomName,
      UserName,
      RazorpayPaymentId,
      RazorpayOrderId,
    } = req.body;
    console.log(
      Price,
      CheckIn,
      CheckOut,
      RoomName,
      UserName,
      RazorpayPaymentId,
      RazorpayOrderId
    );

    const { Token } = req;

    if (!Token) {
      return res.status(400).json({
        message: "Token is required!",
        success: false,
      });
    }

    const email = Token;

    const user = await Users.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found.",
        success: false,
      });
    }

    await Users.updateOne({ email }, { $push: { InvoiceData: req.body } });

    await SendInvoice(email, req.body);

    return res.status(200).json({
      message: "Invoice created and sent successfully.",
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server error. Please try again later.",
      error: error.message,
      success: false,
    });
  }
};
