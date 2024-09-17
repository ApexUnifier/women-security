import mongoose from "mongoose";
import bcrypt from "bcrypt";

class AdminClass {
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

const adminSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

adminSchema.loadClass(AdminClass);
const Admin = mongoose.model("Admin", adminSchema);

export default Admin;
