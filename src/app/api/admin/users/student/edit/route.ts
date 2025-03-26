import { connect } from "@/dbConfig/dbConfig";
import Student from "@/models/studentModel";
import { NextResponse, NextRequest } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, surname, initials, contactNo } = reqBody;

    const user = await Student.findOne(username);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (surname) user.surname = surname;
    if (initials) user.initials = initials;

    await user.save();

    return NextResponse.json({
      message: "Profile information updated successfully",
      success: true,
    });
  } catch (error: any) {
    console.error("Error updating user information:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
