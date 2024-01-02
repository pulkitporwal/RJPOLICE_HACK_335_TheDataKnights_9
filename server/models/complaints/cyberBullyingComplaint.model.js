import mongoose, { Schema } from "mongoose";

const cyberBullyingComplaintSchema = new mongoose.Schema(
  {
    complainerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    platform: {
      type: String,
    },
    culprit: {
      type: String,
    },
    userNameOnThePlatform: {
      type: String,
    },
    screeshot: [
      {
        type: String, // Cloudinary URL
      },
    ],
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    Status: {
      type: Schema.Types.ObjectId,
      ref: "status",
    },
    dateAndTimeOfIncident: {
      type: Date,
      required: true,
    },
    officerAssignedDetails: {
      type: Schema.Types.ObjectId,
      ref: "officer",
    },
    FIRDetails: {
      type: Schema.Types.ObjectId,
      ref: "fir",
    },
  },
  { timestamps: true }
);

export const CyberBullyingComplaint = mongoose.model(
  "cyberbullyingcomplaint",
  cyberBullyingComplaintSchema
);
