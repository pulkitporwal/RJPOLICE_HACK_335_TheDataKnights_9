import mongoose, { Schema } from "mongoose";

const financialFraudComplaintSchema = new mongoose.Schema(
  {
    
  },
  { timestamps: true }
);

export const CyberBullyingComplaint = mongoose.model(
  "finanacialfraudcomplaint",
  financialFraudComplaintSchema
);
