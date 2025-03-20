import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {


    student_id:{
        type: String,
        required: [true, "Student Id missing" ],
        default: null,
    },

    clock_in: {
      type: Date,
      default: null,
    },
    clock_out: {
      type: Date,
      default: null,
    },
   

  },
  { timestamps: true }
);

const Student =
  mongoose.models.student || mongoose.model("student", studentSchema);

export default Student;
