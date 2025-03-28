import { connect } from "@/dbConfig/dbConfig";
import Student from "@/models/studentModel";
import Supervisor from "@/models/supervisorModel";
import { NextResponse, NextRequest } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import Admin from "@/models/adminModel";

connect();

export async function GET(request: NextRequest) {
    try {
        // Authenticate admin
        const userId = await getDataFromToken(request);
        const user = await Admin.findOne({ _id: userId }).select("-password");
        if (!user) {
            return NextResponse.json({ message: "Access denied" }, { status: 403 });
        }

        // Get today's date
        const today = new Date();
        const todayStr = today.toISOString().split("T")[0];

        // Fetch students and supervisors who clocked in today
        const students = await Student.find({ clock_in: { $gte: new Date(todayStr) } }, "username email surname initials role clock_in clock_out").lean();
        const supervisors = await Supervisor.find({ clock_in: { $gte: new Date(todayStr) } }, "username email surname initials role clock_in clock_out").lean();

        // Merge records
        const users = [...students, ...supervisors];

        // Time thresholds
        const currentTime = today.getHours() * 60 + today.getMinutes(); 
        const lateThreshold = 8 * 60 + 10; // 8:10 AM
        const absentThreshold = 16 * 60; // 4:00 PM

        // Process attendance
        const attendanceRecords = users.map(user => {
            let attendanceStatus = "Pending";
            let clockInTime = null;
            let clockOutTime = null;

            if (user.clock_in) {
                const clockInDate = new Date(user.clock_in);
                const clockInStr = clockInDate.toISOString().split("T")[0];

                if (clockInStr === todayStr) {
                    const clockInMinutes = clockInDate.getHours() * 60 + clockInDate.getMinutes();
                    clockInTime = formatDateTime(user.clock_in);
                    clockOutTime = user.clock_out ? formatDateTime(user.clock_out) : null;

                    if (clockInMinutes > lateThreshold) {
                        attendanceStatus = "Late";
                    } else {
                        attendanceStatus = "Attended";
                    }
                }
            }

            if (!clockInTime && currentTime >= absentThreshold) {
                attendanceStatus = "Absent";
            }

            return {
                username: user.username,
                surname: user.surname,
                initials: user.initials,
                role: user.role,
                clock_in: clockInTime,
                clock_out: clockOutTime,
                status: attendanceStatus,
                date: formatDateTime(today),
            };
        });

        return NextResponse.json(attendanceRecords, { status: 200 });

    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || "Internal Server Error" },
            { status: 500 }
        );
    }
}

function formatDateTime(dateString: string | Date): string {
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
