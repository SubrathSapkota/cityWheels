import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    firstName: {
      type: String,
      required: true,
      unique: true,
    },
    lastName: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    userType: {
      type: String,
      enum: ["basic", "vendor", "admin"],
      default: "basic",
    },
    profileImage: String,
    citizenshipId: {
      type: String,
      required: true,
    },
    drivingLicens: {
      type: String,
      required: true,
    },
  },
  {
    timestamp: true,
  }
);

export const User = mongoose.model("User", userSchema);
