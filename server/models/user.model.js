import mongoose, { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: [true, "Name Field is Required"],
      trim: true,
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
      required: [true, "Gender Field is Required"],
    },
    dateOfBirth: {
      type: Date,
      required: [true, "Date of Birth Field is Required"],
    },
    address: {
      type: String,
      required: [true, "Address is Reuired"],
    },
    district: {
      type: String,
      required: [true, "District is Reuired"],
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
      type: Number,
      required: [true, "Pincode is Reuired"],
      max: 6,
      min: 6,
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

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};
userSchema.methods.generateAccessToken = async function () {
  return JWT.sign(
    {
      _id: this._id,
      email: this.email,
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
