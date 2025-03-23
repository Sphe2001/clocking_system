import { connect } from "@/dbConfig/dbConfig";
import SupervisorAttendance from "@/models/supervisorAttendanceModel";
import { NextResponse, NextRequest } from "next/server";

connect();

export async function GET(request: NextRequest) {
    try {
       
        const today = new Date().toISOString().split("T")[0];

        
        const supervisorAttCount = await SupervisorAttendance.countDocuments({
            clock_in: {
                $gte: new Date(today + "T00:00:00.000Z"),  // Start of the day
                $lt: new Date(today + "T23:59:59.999Z")   // End of the day
            }
        });

        
        return NextResponse.json({ supervisorAttCount }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || "Internal Server Error" },
            { status: 500 }
        );
    }
}
