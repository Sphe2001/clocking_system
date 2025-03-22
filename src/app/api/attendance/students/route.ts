import { connect } from "@/dbConfig/dbConfig";
import StudentAttendance from "@/models/studentAttendanceModel";
import { NextResponse, NextRequest } from "next/server";

connect();

// Function to get start (Monday) and end (Sunday) of the current week
function getCurrentWeekDates() {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const monday = new Date(today);
    monday.setDate(today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1)); 
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
    return { monday, sunday };
}

// Function to fetch and format student attendance records
async function getStudentAttendanceRecords() {
    try {
        const { monday, sunday } = getCurrentWeekDates();
        const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
        
        // Fetch attendance records within the current week
        const students = await StudentAttendance.find({
            clock_in: { $gte: monday, $lte: sunday },
        }).lean();

        const attendanceMap: any = {};
        students.forEach(record => {
            const date = new Date(record.clock_in).toDateString();
            if (!attendanceMap[record.email]) {
                attendanceMap[record.email] = {
                    name: record.surname + "-" + record.initials,
                    role: "Student",
                    studentNo: record.studentNo,
                    email: record.email,
                    attendance: {},
                };
            }
            attendanceMap[record.email].attendance[date] = "Attended";
        });

        // Fill missing days
        const today = new Date().toDateString();
        for (const user in attendanceMap) {
            weekdays.forEach((day, index) => {
                const currentDate = new Date(monday);
                currentDate.setDate(monday.getDate() + index);
                const dateStr = currentDate.toDateString();

                if (!attendanceMap[user].attendance[dateStr]) {
                    attendanceMap[user].attendance[dateStr] = currentDate < new Date() ? "Absent" : "Pending";
                }
            });
        }

        return attendanceMap;
    } catch (error) {
        console.error("Error fetching student attendance:", error);
        throw new Error("Failed to retrieve student attendance.");
    }
}

// API Endpoint for Student Attendance
export async function GET(request: NextRequest) {
    try {
        const studentAttendanceData = await getStudentAttendanceRecords();
        return NextResponse.json(studentAttendanceData);
    } catch (error: any) {
        return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
    }
}
