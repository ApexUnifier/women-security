import mongoose from "mongoose";

const alertSchema = new mongoose.Schema(
  {
    userId: {
      type: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      required: true,
      unique: true,
    },
    latitide: {
      type: String,
      required: true,
      unique: true,
    },
    longitiude: {
      type: String,
      required: true,
    },
    reason: {
      type: String,
    },
    assignedTo: {
      type: { type: mongoose.Schema.Types.ObjectId, ref: "Police" },
    },
    isClosed: {
      type: Boolean,
      default: false,
    },
    closingReason: { type: String },
  },
  {
    timestamps: true,
  }
);

const Alert = mongoose.model("Alert", zoneSchema);

export default Alert;
