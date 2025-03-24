import { connect } from "@/dbConfig/dbConfig";
import StudentAttendance from "@/models/studentAttendanceModel";
import { NextResponse, NextRequest } from "next/server";

// Connect to database
async function initializeDB() {
  await connect();
}

// Get start (Monday) and end (Sunday) of the current week (SAST)
function getCurrentWeekDates(): { monday: Date; sunday: Date } {
  const today = new Date();
  const currentDay = today.getDay(); // Sunday = 0, Monday = 1, ..., Saturday = 6
  const monday = new Date(today);

  // Adjust to get Monday (if today is Sunday, go back 6 days)
  monday.setDate(today.getDate() - (currentDay === 0 ? 6 : currentDay - 1));
  monday.setHours(0, 0, 0, 0); // Reset time to start of the day

  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  sunday.setHours(23, 59, 59, 999); // End of Sunday

  return { monday, sunday };
}

// Get correct day of the week in South African time
function getDayOfWeek(date: Date): string {
  return date.toLocaleDateString("en-ZA", {
    weekday: "long",
    timeZone: "Africa/Johannesburg",
  });
}

async function getStudentAttendanceRecords() {
  try {
    const { monday, sunday } = getCurrentWeekDates();
    const students = await StudentAttendance.find({
      clock_in: { $gte: monday, $lte: sunday },
    }).lean();

    const attendanceMap: Record<string, any> = {};
    const currentDate = new Date();
    const timeZone = "Africa/Johannesburg";

    for (let i = 0; i < 7; i++) {
      const dayDate = new Date(monday);
      dayDate.setDate(monday.getDate() + i);
      dayDate.setHours(0, 0, 0, 0); // Normalize time

      const formattedDate = dayDate
        .toLocaleDateString("en-ZA", { timeZone })
        .split("/")
        .reverse()
        .join("-"); // Convert to YYYY-MM-DD
      const dayOfWeek = getDayOfWeek(dayDate); // Get correct weekday name

      students.forEach((record) => {
        if (!attendanceMap[record.email]) {
          attendanceMap[record.email] = {
            name: `${record.surname}-${record.initials}`,
            role: "Student",
            studentNo: record.studentNo,
            email: record.email,
            attendance: {},
          };
        }

        // Normalize stored date for comparison
        const recordDate = new Date(record.clock_in);
        recordDate.setHours(0, 0, 0, 0);
        const recordFormattedDate = recordDate
          .toLocaleDateString("en-ZA", { timeZone })
          .split("/")
          .reverse()
          .join("-");

        if (recordFormattedDate === formattedDate) {
          attendanceMap[record.email].attendance[formattedDate] = {
            date: formattedDate,
            dayOfWeek,
            status: "Attended",
          };
        }
      });

      // Fill missing attendance days
      for (const user in attendanceMap) {
        if (!attendanceMap[user].attendance[formattedDate]) {
          attendanceMap[user].attendance[formattedDate] = {
            date: formattedDate,
            dayOfWeek,
            status: dayDate < currentDate ? "Absent" : "Pending",
          };
        }
      }
    }

    return attendanceMap;
  } catch (error) {
    console.error("Error fetching student attendance:", error);
    throw new Error("Failed to retrieve student attendance.");
  }
}

// API Endpoint
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
