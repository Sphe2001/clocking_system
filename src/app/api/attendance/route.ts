import { connect } from "@/dbConfig/dbConfig";
import StudentAttendance from "@/models/studentAttendanceModel";
import SupervisorAttendance from "@/models/supervisorAttendanceModel";
import { NextResponse, NextRequest } from "next/server";

connect();

// Helper function to get the start (Monday) and end (Sunday) of the current week
function getCurrentWeekDates() {
    const today = new Date();
    const dayOfWeek = today.getDay(); // Sunday = 0, Monday = 1, ..., Saturday = 6

    // Adjust today’s date to get Monday's date
    const monday = new Date(today);
    monday.setDate(today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1)); 

    // Get Sunday's date (End of the week)
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);

    return { monday, sunday };
}

// Function to format attendance data for each user
async function getAttendanceRecords() {
    try {
        const { monday, sunday } = getCurrentWeekDates();
        const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
        
        // Fetch attendance records for both students and supervisors within this week
        const students = await StudentAttendance.find({
            clock_in: { $gte: monday, $lte: sunday },
        }).lean();

        const supervisors = await SupervisorAttendance.find({
            clock_in: { $gte: monday, $lte: sunday },
        }).lean();

        // Function to process attendance data
        const processAttendance = (records: any[], role: string) => {
            const attendanceMap: any = {};

            records.forEach(record => {
                const date = new Date(record.clock_in).toDateString();
                if (!attendanceMap[record.email]) {
                    attendanceMap[record.email] = {
                        name: record.surname + " " + record.initials,
                        role,
                        attendance: {},
                    };
                }
                attendanceMap[record.email].attendance[date] = "Attended";
            });

            return attendanceMap;
        };

        // Process attendance data
        const studentAttendance = processAttendance(students, "Student");
        const supervisorAttendance = processAttendance(supervisors, "Supervisor");

        // Merge student and supervisor records
        const allAttendance = { ...studentAttendance, ...supervisorAttendance };

        // Fill missing days for each user
        const today = new Date().toDateString();
        for (const user in allAttendance) {
            weekdays.forEach((day, index) => {
                const currentDate = new Date(monday);
                currentDate.setDate(monday.getDate() + index);
                const dateStr = currentDate.toDateString();

                if (!allAttendance[user].attendance[dateStr]) {
                    if (dateStr === today) {
                        allAttendance[user].attendance[dateStr] = "Pending";
                    } else if (currentDate < new Date()) {
                        allAttendance[user].attendance[dateStr] = "Absent";
                    } else {
                        allAttendance[user].attendance[dateStr] = "Pending";
                    }
                }
            });
        }

        return allAttendance;
    } catch (error) {
        console.error("Error fetching attendance records:", error);
        throw new Error("Failed to retrieve attendance records.");
    }
}

// API Endpoint to fetch attendance data
export async function GET(request: NextRequest) {
    try {
        const attendanceData = await getAttendanceRecords();
        return NextResponse.json(attendanceData);
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || "Internal Server Error" },
            { status: 500 }
        );
    }
}
