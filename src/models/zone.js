import mongoose from "mongoose";

const zoneSchema = new mongoose.Schema(
  {
    latitude: {
      type: String,
      required: true,
      unique: true,
    },
    longitude: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ["RED", "GREEN", "YELLOW"],
      default: "GREEN",
    },
    crimeCount: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const Zone = mongoose.model("Zone", zoneSchema);

export default Zone;
