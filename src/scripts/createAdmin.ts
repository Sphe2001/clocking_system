import mongoose from "mongoose";
import Admin from "@/models/adminModel";
import bcrypt from "bcryptjs";
import { connect } from "@/dbConfig/dbConfig";

const run = async (): Promise<void> => {
  try {
    await connect();
    console.log("Database connected");

    // Hash password
    const hashedPassword = await bcrypt.hash("pass", 10);

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: "admin@tut.ac.za" });
    if (existingAdmin) {
      console.log("Admin already exists:", existingAdmin);
      return;
    }

    // Create a new admin
    const admin = new Admin({
      username: "654321",
      email: "admin@etut.ac.za",
      password: hashedPassword,
      isVerified: true,
      isAdmin: true,
    });

    await admin.save();
    console.log("Admin created successfully:", admin);
  } catch (error) {
    console.error("Error creating admin:", error);
  } finally {
    await mongoose.disconnect();
  }
};

// Run the script
run();
