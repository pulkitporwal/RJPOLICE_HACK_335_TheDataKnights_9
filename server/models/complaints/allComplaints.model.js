import mongoose, { Schema } from "mongoose";

const allComplaintSchema = new mongoose.Schema({
  cyberBullyingComplaintId: {
    type: Schema.Types.ObjectId,
    ref: "cyberbullyingcomplaint",
  },
  financialFraudComplaintId: {
    type: Schema.Types.ObjectId,
    ref: "finanacialfraudcomplaint",
  },
});

export const AllComplaint = mongoose.model("allcomplaint", allComplaintSchema);
