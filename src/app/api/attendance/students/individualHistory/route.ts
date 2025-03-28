
import { connect } from "@/dbConfig/dbConfig";
import StudentAttendance from "@/models/studentAttendanceModel"; // Ensure this model exists
import { NextResponse, NextRequest } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import Student from "@/models/studentModel";

connect();

export async function GET(request: NextRequest) {
    try {
        // Authenticate student
        const userId = await getDataFromToken(request);
        const student = await Student.findOne({ _id: userId }).lean();

        if (!student) {
            return NextResponse.json({ message: "Student not found" }, { status: 404 });
        }

        // Fetch all attendance records for this student
        const attendanceRecords = await StudentAttendance.find({ email: student.email }).lean();

        // Format the attendance records
        const formattedRecords = attendanceRecords.map(record => ({
            clock_in: record.clock_in ? formatDateTime(record.clock_in) : null,
            clock_out: record.clock_out ? formatDateTime(record.clock_out) : null,
            date: formatDateTime(record.clock_in || record.clock_out),
            status: determineStatus(record.clock_in),
        }));

        return NextResponse.json(formattedRecords, { status: 200 });

    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || "Internal Server Error" },
            { status: 500 }
        );
    }
}

function determineStatus(clockIn: string | null): string {
    if (!clockIn) return "Absent";

    const clockInTime = new Date(clockIn);
    const clockInMinutes = clockInTime.getHours() * 60 + clockInTime.getMinutes();
    const lateThreshold = 8 * 60 + 10; // 8:10 AM

    return clockInMinutes > lateThreshold ? "Late" : "Attended";
}

function formatDateTime(dateString: string | Date): string {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleString("en-GB", { 
        year: "numeric", 
        month: "2-digit", 
        day: "2-digit", 
        hour: "2-digit", 
        minute: "2-digit",
        hour12: false 
    }).replace(",", ""); 
}
