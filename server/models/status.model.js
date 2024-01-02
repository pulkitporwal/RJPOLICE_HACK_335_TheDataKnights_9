import mongoose, { Schema } from "mongoose";

const statusSchema = new mongoose.Schema({
  complaintId: {
    type: Schema.Types.ObjectId,
    ref: "allcomplaint",
  },
  status: {
    type: String,
    enum: [
      "Pending",
      "Rejected",
      "Approved",
      "Under Investigation",
      "Resolved",
    ],
  },
  pendingDateAndTime: {
    type: Date,
    default: Date.now(),
  },
  rejectedDateAndTime: {
    type: Date,
  },
  approvedDateAndTime: {
    type: Date,
  },
  underInvestigationDateAndTime: {
    type: Date,
  },
  resolvedDateAndTime: {
    type: Date,
  },
});

export const Status = mongoose.model("status", statusSchema);
