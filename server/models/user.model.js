import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      trim: true,
    },
    role:{
      type : String,
      enum:['Complainer','Operator','Admin'],
      default : 'Complainer'
    },
    email: {
      type: String,
      required: [true, "Email Field is Required"],
      unique: true,
      lowercase: true,
      index: true,
      trim: true,
    },
    phoneNumber: {
      type: Number,
      unique: true,
      index: true,
      required: [true, "Phone Number Field is Required"],
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
    },
    dateOfBirth: {
      type: Date,
    },
    address: {
      type: String,
      required: [true, "Address is Reuired"],
    },
    address2: {
      type: String,
    },
    state: {
      type: String,
      required: [true, "State is Reuired"],
    },
    country: {
      type: String,
      required: [true, "Country is Reuired"],
    },
    pincode: {
      type: String,
      required: [true, "Pincode is Required"],
    },
    password: {
      type: String,
      required: [true, "Password is Required"],
      select: false,
    },
    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.isPasswordCorrect = async function (pass) {
  try {
    const userDetails = await User.findOne({ email: this.email }).select('password');

    const isCorrectPassword = await bcrypt.compare(pass, userDetails.password);

    return isCorrectPassword;
  } catch (err) {
    console.error(err);
    return false; 
  }
};
userSchema.methods.generateAccessToken = async function () {
  return JWT.sign(
    {
      _id: this._id,
      email: this.email,
      phoneNumber: this.phoneNumber,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  );
};
userSchema.methods.generateRefreshToken = async function () {
  return JWT.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
  );
};

export const User = mongoose.model("user", userSchema);
