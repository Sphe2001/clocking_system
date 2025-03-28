import mongoose from "mongoose";

const supervisorAttendanceSchema = new mongoose.Schema(
  {
    staffNo: {
      type: Number,
      required: [true, "Please provide a staff number"],
      index: true,
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
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

    clock_in: {
      type: Date,
      required: [true, "Please provide clock in time"],
    },
    clock_out: {
      type: Date,
      required: [true, "Please provide clock out time"],
    },
   
  },
);

const SupervisorAttendance =
  mongoose.models.supervisorattendance || mongoose.model("supervisorattendance", supervisorAttendanceSchema);

export default SupervisorAttendance;
