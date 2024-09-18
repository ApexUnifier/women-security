import mongoose from "mongoose";

const zoneSchema = new mongoose.Schema(
  {
    latitude: {
      type: String,
      required: true,
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

// Create a compound index to ensure unique latitude and longitude pairs
zoneSchema.index({ latitude: 1, longitude: 1 }, { unique: true });

const Zone = mongoose.model("Zone", zoneSchema);

export default Zone;
