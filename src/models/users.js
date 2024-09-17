import mongoose from "mongoose";
import bcrypt from "bcrypt";

class UserClass {
  // Method to check if the provided password matches the stored hashed password
  async validatePassword(password) {
    return await bcrypt.compare(password, this.password);
  }

  // Method to get a formatted version of the user's emergency contact
  getFormattedEmergencyContact() {
    return `${this.emergencyContact.name} - Phone: ${this.emergencyContact.phone}, Email: ${this.emergencyContact.email}`;
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

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    aadhar: {
      type: String,
      required: true,
    },
    emergencyContact: {
      name: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

userSchema.loadClass(UserClass);
const User = mongoose.model("User", userSchema);

export default User;
