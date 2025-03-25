import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/studentModel";
import StudentAttendance from "@/models/studentAttendanceModel";
import { NextResponse, NextRequest } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";

connect();

export async function POST(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);

    if (!userId) {
      return NextResponse.json({ error: "User not found" }, { status: 400 });
    }

    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 400 });
    }

    const clockOutTime = new Date();

    if (user.clock_out) {
      const lastClockOutDate = new Date(user.clock_out).toDateString();
      const todayDate = new Date().toDateString();

      if (lastClockOutDate === todayDate) {
        return NextResponse.json(
          { error: "You have already clocked out today" },
          { status: 400 }
        );
      }
    }

    user.clock_out = clockOutTime;
    await user.save();

    const attendanceRecord = new StudentAttendance({
      studentNo: user.username,
      email: user.email,
      surname: user.surname,
      initials: user.initials,
      contactNo: user.contactNo,
      clock_in: user.clock_in,
      clock_out: clockOutTime,
    });

    await attendanceRecord.save();

    return NextResponse.json({
      message: "Clock-out successful & Attendance recorded",
      success: true,
    });
  } catch (error: any) {
    console.error("Error in clock-out:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
