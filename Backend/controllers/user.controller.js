import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/datauri.js";
import otpGenerator from "../utils/otpGenerator.js";
import sendOtpEmail from "../utils/mailer.js"
export const register = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, role } = req.body;

    if (!fullname || !email || !phoneNumber || !password || !role) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }
    const file = req.file;
 
    const fileUri = getDataUri(file);
    let cloudResponse;
    try {
      cloudResponse = await cloudinary.uploader.upload(fileUri.content);
    } catch (error) {
      console.error("Cloudinary Upload Error:", error);
      return res.status(500).json({
        message: "Error uploading profile photo.",
        success: false,
      });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "User already exist with this email.",
        success: false,
      });
    }
    const otp=otpGenerator();
    const otpTimestamp=Date.now();
    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
      otp,
      otpTimestamp,
      profile: {
        profilePhoto: cloudResponse.secure_url,
      },
    });
    try {
      sendOtpEmail(email, otp);
    } catch (error) {
      console.error("Email Sending Error:", error);
      return res.status(500).json({
        message: "Error sending OTP. Please try again.",
        success: false,
      });
    }
    return res.status(201).json({
      message: "Account created successfully.",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error.",
      success: false,
    });
  }
};
export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Incorrect email or password.",
        success: false,
      });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Incorrect email or password.",
        success: false,
      });
    }
    // check role is correct or not
    if (role !== user.role) {
      return res.status(400).json({
        message: "Account doesn't exist with current role.",
        success: false,
      });
    }

    const tokenData = {
      userId: user._id,
    };
    const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpsOnly: true,
        sameSite: "strict",
      })
      .json({
        message: `Welcome back ${user.fullname}`,
        user,
        success: true,
      });
  } catch (error) {
    console.log(error);
  }
};
export const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logged out successfully.",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
export const updateProfile = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, bio, skills } = req.body;

    const file = req.file;
    // cloudinary ayega idhar
    const fileUri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

    if (!fullname || !email || !phoneNumber || !bio || !skills) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }

    let skillsArray;
    skillsArray = skills.split(",");

    const userId = req.id; // middleware authentication
    let user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({
        message: "User not found.",
        success: false,
      });
    }
    // updating data
    if (fullname) user.fullname = fullname;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile.bio = bio;
    if (skills) user.profile.skills = skillsArray;

    // resume comes later here...
    if (cloudResponse) {
      user.profile.resume = cloudResponse.secure_url; // save the cloudinary url
      user.profile.resumeOriginalName = file.originalname; // Save the original file name
    }

    await user.save();

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res.status(200).json({
      message: "Profile updated successfully.",
      user,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error", success: false });
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    // Check if OTP is provided
    if (!otp || !email) {
      return res.status(400).json({
        message: "Email and OTP are required.",
        success: false,
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: 'User not found.',
        success: false,
      });
    }

    // Check if OTP has expired (valid for 5 minutes)
    if (Date.now() - user.otpTimestamp > 5 * 60 * 1000) {
      // Delete the user if OTP expired
      await User.deleteOne({ email });

      return res.status(400).json({
        message: 'OTP expired. User deleted.',
        success: false,
      });
    }

    // Validate OTP
    if (user.otp !== otp) {
      // Delete the user if OTP is incorrect
     

      return res.status(400).json({
        message: 'Invalid OTP',
        success: false,
      });
    }

    // If OTP is valid, set isVerified to true and clear OTP data
    user.isVerified = true;
    
    user.otp = null;
    user.otpTimestamp = null;
    await user.save();
    

    return res.status(200).json({
      message: 'OTP verified successfully.',
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Internal server error.',
      success: false,
    });
  }
};

export const resendOtp = async (req, res) => {
  const {email} = req.body;

  try {
    const user = await User.findOne({email});

    if (!user) {
      return res.status(400).json({ message: "User not found.", success: false });
    }

    const otp = otpGenerator();
    user.otp = otp;
    user.otpTimestamp = Date.now();
    await user.save();

    sendOtpEmail(email, otp); // Send the OTP email

    res.status(200).json({ message: "OTP sent successfully.", success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error.", success: false });
  }
};
