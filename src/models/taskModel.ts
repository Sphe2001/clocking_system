import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(

  {
    username: {
      type: Number,
      required: [true, "Please provide a staff number"],
      unique: true,
      trim: true,
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
    message: {
        type: String,
        required: [true, "Please provide contact number"],
    },

  },
  { timestamps: true }
);
const Task = mongoose.models?.task || mongoose.model("task", taskSchema);
export default Task;