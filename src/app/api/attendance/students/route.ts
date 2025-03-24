import { connect } from "@/dbConfig/dbConfig";
import StudentAttendance from "@/models/studentAttendanceModel";
import { NextResponse, NextRequest } from "next/server";

// Connect to database
async function initializeDB() {
  await connect();
}

// Get start (Monday) and end (Sunday) of the current week
function getCurrentWeekDates() {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const monday = new Date(today);
  monday.setDate(today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));
  monday.setHours(0, 0, 0, 0);

  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  sunday.setHours(23, 59, 59, 999);

  return { monday, sunday };
}

async function getStudentAttendanceRecords() {
  try {
    const { monday, sunday } = getCurrentWeekDates();

    const students = await StudentAttendance.find({
      clock_in: { $gte: monday, $lte: sunday },
    }).lean();

    const attendanceMap: Record<string, any> = {};
    const weekdays = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];

    students.forEach((record) => {
      const formattedDate = new Date(record.clock_in)
        .toISOString()
        .split("T")[0];
      if (!attendanceMap[record.email]) {
        attendanceMap[record.email] = {
          name: `${record.surname}-${record.initials}`,
          role: "student",
          studentNo: record.studentNo,
          email: record.email,
          attendance: {},
        };
      }
      attendanceMap[record.email].attendance[formattedDate] = "Attended";
    });

    // Fill missing days
    for (const user in attendanceMap) {
      weekdays.forEach((_, index) => {
        const currentDate = new Date(monday);
        currentDate.setDate(monday.getDate() + index);
        const formattedDate = currentDate.toISOString().split("T")[0];

        if (!attendanceMap[user].attendance[formattedDate]) {
          attendanceMap[user].attendance[formattedDate] =
            currentDate < new Date() ? "Absent" : "Pending";
        }
      });
    }

    return attendanceMap;
  } catch (error) {
    console.error("Error fetching student attendance:", error);
    throw new Error("Failed to retrieve student attendance.");
  }
}

export async function GET(request: NextRequest) {
  try {
    await initializeDB();
    const studentAttendanceData = await getStudentAttendanceRecords();
    return NextResponse.json(studentAttendanceData);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
