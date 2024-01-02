import { User } from "../models/user.model.js";
import JWT from "jsonwebtoken";

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const loggedInUser = await User.findById(userId.toString()).select(
      "-password -refreshToken"
    );
    const accessToken = await loggedInUser.generateAccessToken();
    const refreshToken = await loggedInUser.generateRefreshToken();

    loggedInUser.refreshToken = refreshToken;
    await loggedInUser.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    return res.status(400).json({
      success: false,
      message:
        "Something Went Wrong while generating accessToken and refreshToken",
    });
  }
};

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

  if (
    !(
      fullName &&
      email &&
      phoneNumber &&
      gender &&
      dateOfBirth &&
      address &&
      district &&
      state &&
      country &&
      pincode &&
      password
    )
  ) {
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

  //   Removing Password Field so user can't see
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
  const { email, password } = req.body;
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
    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
      fetchedUser._id
    );

    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json({
        success: true,
        message: "You are successfully Logged-In.",
      });
  }
};

const logoutUser = async (req, res) => {
  const loggedInUser = req.user;

  await User.findByIdAndUpdate(
    loggedInUser._id,
    {
      $set: {
        refreshToken: "",
      },
    },
    {
      new: true,
    }
  );

  const option = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", option)
    .clearCookie("refreshToken", option)
    .json({
      success: true,
      message: "User Logged Out Successfully",
    });
};

const refreshAccessToken = async (req, res) => {
  const incomingToken = req.cookies.refreshToken || req.body.refreshToken;

  if (!incomingToken) {
    return res.status(400).json({
      success: false,
      message: "Unauthorized Access",
    });
  }

  const decodedData = JWT.verify(
    incomingToken,
    process.env.REFRESH_TOKEN_SECRET
  );

  const userFromDecodedData = await User.findById(decodedData._id);

  if (!userFromDecodedData) {
    return res.status(401).json({
      success: false,
      message: "Invaid Refresh Token",
    });
  }

  if (incomingToken !== userFromDecodedData.refreshToken) {
    return res.status(401).json({
      success: false,
      message: "Refresh Token has been expired or used",
    });
  }

  const option = {
    httpOnly: true,
    secure: true,
  };

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    userFromDecodedData._id
  );

  return res
    .status(200)
    .cookie("refreshToken", refreshToken, option)
    .cookie("accessToken", accessToken, option)
    .json({
      success: true,
      message: "Access token refreshed",
    });
};

const changeUserPassword = async (req, res) => {
  const { oldPassword, newPassword, confirmPassword } = req.body;

  if (!(oldPassword || newPassword || confirmPassword)) {
    return res.status(400).json({
      success: false,
      message: "All Fields are mandatory",
    });
  }

  if (newPassword !== confirmPassword) {
    return res.status(400).json({
      success: false,
      message: "New Password and Confirm Passwod doesn't match",
    });
  }

  const user = await User.findById(req.user._id).select("+password");
  const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);

  if (!oldPassword) {
    return res.status(400).json({
      success: false,
      message: "Old Password is wrong.",
    });
  }

  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  return res.status(200).json({
    success: true,
    message: "Password Changed Successfully",
  });
};

const getCurrentUserDetails = async (req, res) => {
  const userData = req.user;

  return res.status(200).json({
    success: true,
    message: "User Information has been fetched Successfully",
    userData,
  });
};

export {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  changeUserPassword,
  getCurrentUserDetails,
};
