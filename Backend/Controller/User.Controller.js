import { SendVerificationCode, WelcomeEmail } from "../Middleware/Email.js";
import Users from "../Model/User.Model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Otp from "../Model/Otp.Model.js";

export const SignUP = async (req, res) => {
  try {
    const { email, password, name } = req.body.data;

    if (!email || !password || !name) {
      return res.status(400).json({
        message: "All fields are required!",
        success: false,
      });
    }

    const existingUser = await Users.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "A user already exists with this email.",
        success: false,
      });
    }

    const Token = await jwt.sign({ data: email }, 'GigaLuxe');
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword, "from SignUp");

    let data = {
      email,
      name,
      password: hashedPassword,
      Token,
    };
    const newUser = await Users.create(data);

    if (newUser) {
      await WelcomeEmail(email, name);
      await Otp.deleteMany({});
    }

    return res.status(201).json({
      message: "User created successfully!",
      email,
      name,
      Token,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error. Please try again later.",
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
      return res.status(404).json({
        message: "User found with this email.",
        success: false,
      });
    }

    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

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
    console.log(error.message);
    return res.status(500).json({
      message: "Server error. Please try again later.",
      success: false,
    });
  }
};


export const VerifyEmail = async (req, res) => {
  try {
    const { code, email } = req.body.data;
    console.log(code);

    if (!code || !email) {
      return res.status(400).json({
        message: "OTP and email are required.",
        success: false,
      });
    }

    const otpRecord = await Otp.findOne({ email });
    if (!otpRecord) {
      return res.status(400).json({
        message: "No OTP found for this email.",
        success: false,
      });
    }

    // if (otpRecord.otp !== code) {
    //   return res.status(400).json({
    //     message: "Invalid OTP. Please try again.",
    //     success: false,
    //   });
    // }

    return res.status(200).json({
      message: "Email verified successfully.",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error. Please try again later.",
      error: error.message,
      success: false,
    });
  }
};


export const SignIN = async (req, res) => {
  // console.log(req.body.data);

  try {
    console.log(req);
    const { Token } = req;
    const { email, password } = req.body;
    console.log(Token);

    if (!email && !password && !Token) {
      return res.status(400).json({
        message: "Email and password are required!",
        success: false,
      });
    }
    if (email !== Token) {
      return res.status(400).json({
        message: "Valid Email is required!",
        success: false,
      });
    }

    const user = await Users.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User is Not Found !",
        success: false,
      });
    }

    const name = user.name;
    const verifyPassword = bcrypt.compare(password, user.password);

    if (verifyPassword) {
      return res.status(200).json({
        message: "User is Found",
        email, name,
        success: true,
      });
    }
    return res.status(404).json({
      message: "User is not Found !",
      success: false,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server Error",
      error: error.message,
      success: true,
    });
  }
};

export const LogOut = (req, res) => {
  try {
    // Logic for logout (clear session or JWT token handling can be added here)

    return res.status(200).json({
      message: "User logged out successfully.",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error. Please try again later.",
      error: error.message,
      success: false,
    });
  }
};


