import mongoose from "mongoose";

const supervisorSchema = new mongoose.Schema(
  {
    username: {
      type: Number,
      required: [true, "Please provide a staff number"],
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    surname: {
        type: String,
        required: [true, "Please provide a surname"],
        
    },
    initials: {
        type: String,
        required: [true, "Please provide initial(s)"],
        
    },
    contactNo: {
        type: String,
        required: [true, "Please provide contact number"],
        
    },
    role: {
        type: String,
        required: [true, "Please select role"],
        lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
    },
    clock_in: {
        type: Date,
        default: null,
    },
    clock_out: {
        type: Date,
        default: null,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    forgotPasswordToken: {
      type: String,
      default: null,
    },
    forgotPasswordTokenExpiry: {
      type: Date,
      default: null,
    },
    verifyToken: {
      type: String,
      default: null,
    },
    verifyTokenExpiry: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

const Supervisor = mongoose.models.supervisors || mongoose.model("supervisor", supervisorSchema);

export default Supervisor;