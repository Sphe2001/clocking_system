import { connect } from "@/dbConfig/dbConfig";
import Student from "@/models/studentModel"; // Ensure this model exists
import { NextResponse } from "next/server";

connect();

export async function GET() {
  try {
    const students = await Student.find({}, "username").lean(); // Fetch only usernames
    return NextResponse.json({ students }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
