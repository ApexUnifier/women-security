import mongoose from "mongoose";
import bcrypt from "bcrypt";

class PoliceClass {
  // Method to check if the provided password matches the stored hashed password
  async validatePassword(password) {
    return await bcrypt.compare(password, this.password);
  }

  // Method to update the user's password
  async updatePassword(newPassword) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(newPassword, salt);
    return this.save();
  }

  // Method to hash a password and return the hashed value
  async getHashedPassword(password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }
}

const policeSchema = new mongoose.Schema(
  {
    regId: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

policeSchema.loadClass(PoliceClass);
const Police = mongoose.model("Police", policeSchema);

export default Police;
