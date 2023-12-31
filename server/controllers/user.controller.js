import mongoose from "mongoose";
import { User } from "../models/user.model.js";

const generateAccessAndRefreshToken = async (userId) => {};

const registerUser = async (req, res) => {
  // Getting User Information from frontend
  const {
    fullName,
    email,
    phoneNumber,
    gender,
    dateOfBirth,
    address,
    district,
    state,
    country,
    pincode,
    password,
  } = req.body;

  // Applying some Validation

  if (!fullName) {
    return res.status(400).json({
      success: false,
      message: "All Fields are required",
    });
  }
  if (!email) {
    return res.status(400).json({
      success: false,
      message: "All Fields are required",
    });
  }
  if (!phoneNumber) {
    return res.status(400).json({
      success: false,
      message: "All Fields are required",
    });
  }
  if (!gender) {
    return res.status(400).json({
      success: false,
      message: "All Fields are required",
    });
  }
  if (!dateOfBirth) {
    return res.status(400).json({
      success: false,
      message: "All Fields are required",
    });
  }
  if (!address) {
    return res.status(400).json({
      success: false,
      message: "All Fields are required",
    });
  }
  if (!district) {
    return res.status(400).json({
      success: false,
      message: "All Fields are required",
    });
  }
  if (!state) {
    return res.status(400).json({
      success: false,
      message: "All Fields are required",
    });
  }
  if (!country) {
    return res.status(400).json({
      success: false,
      message: "All Fields are required",
    });
  }
  if (!pincode) {
    return res.status(400).json({
      success: false,
      message: "All Fields are required",
    });
  }
  if (!password) {
    return res.status(400).json({
      success: false,
      message: "All Fields are required",
    });
  }

  // User is exist Validation
  const isUserExist = await User.findOne({ $or: [{ email }, { phoneNumber }] });
  if (isUserExist) {
    return res.status(401).json({
      success: false,
      message: "User is already exist with given Email or Phone Number",
    });
  }

  // Creating User
  const createdUser = await User.create({
    fullName: fullName,
    email: email,
    phoneNumber: phoneNumber,
    gender: gender,
    dateOfBirth: dateOfBirth,
    address: address,
    district: district,
    state: state,
    country: country,
    pincode: pincode,
    password: password,
  });

  //   Removing Password Field from database
  const createdUserDataAfterRemovingPassword = await User.findById(
    createdUser._id
  ).select("-password");

  if (!createdUserDataAfterRemovingPassword) {
    return res.status(402).json({
      success: false,
      message: "Something Went Wrong while Registering User",
    });
  }

  // Sending Success Response
  return res.status(200).json({
    success: true,
    message: "User Registered Successfuly",
    createdUserDataAfterRemovingPassword,
  });
};

const loginUser = async (req, res) => {
  const { email, password, phoneNumber } = req.body;

  //   if (!phoneNumber) {
  //     return res.status(400).json({
  //       success: false,
  //       message: "Please Enter Phone Number",
  //     });
  //   }
  if (!email) {
    return res.status(400).json({
      success: false,
      message: "Please Enter Email",
    });
  }
  if (!password) {
    return res.status(400).json({
      success: false,
      message: "Please Enter Password",
    });
  }
  const fetchedUser = await User.findOne({
    $or: [{ email }],
  });
  if (!fetchedUser) {
    return res.status(404).json({
      success: false,
      message: "User does not exist. Please Signup",
    });
  }
  const isPasswordValid = await fetchedUser.isPasswordCorrect(password);
  if (!isPasswordValid) {
    return res.status(404).json({
      success: false,
      message: "User credential is not correct",
    });
  }
  if (isPasswordValid) {
    return res.status(200).json({
      success: true,
      message: "You are successfully Logged-In.",
    });
  }
};

const logoutUser = (req, res) => {

};

export { registerUser, loginUser, logoutUser };
