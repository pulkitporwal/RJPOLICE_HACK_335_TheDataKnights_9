import mongoose, { Schema } from "mongoose";

const officerSchema = new mongoose.Schema({});

export const Officer = mongoose.model("officer", officerSchema);
