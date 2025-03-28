import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/supervisorModel";
import SupervisorAttendance from "@/models/supervisorAttendanceModel";
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
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const clockOutTime = new Date();

        user.clock_out = clockOutTime;
        await user.save();

        const attendanceRecord = new SupervisorAttendance({
            staffNo: user.username,
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
