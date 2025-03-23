import { connect } from "@/dbConfig/dbConfig";
import StudentAttendance from "@/models/studentAttendanceModel";
import { NextResponse, NextRequest } from "next/server";

connect();

export async function GET(request: NextRequest) {
    try {
        // Get today's date in ISO format (YYYY-MM-DD)
        const today = new Date().toISOString().split("T")[0];

        // Count the number of students who attended today (clock_in exists and matches today's date)
        const studentAttCount = await StudentAttendance.countDocuments({
            clock_in: {
                $gte: new Date(today + "T00:00:00.000Z"),  // Start of the day
                $lt: new Date(today + "T23:59:59.999Z")   // End of the day
            }
        });

        // Return the count of attended students
        return NextResponse.json({ studentAttCount }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || "Internal Server Error" },
            { status: 500 }
        );
    }
}
