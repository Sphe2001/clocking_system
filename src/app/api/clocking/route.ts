import { connect } from "@/dbConfig/dbConfig";
import Student from "@/models/studentModel";
import Supervisor from "@/models/supervisorModel";
import { NextResponse } from "next/server";

connect();

export async function GET() {
    try {
        const studentClockings = await Student.find({}, "username role clock_in clock_out").lean();
        const supervisorClockings = await Supervisor.find({}, "username role clock_in clock_out").lean();

        const combinedClockings = [...studentClockings, ...supervisorClockings].map(entry => ({
            name: entry.username,
            role: entry.role,
            clock_in: entry.clock_in,
            clock_out: entry.clock_out,
            date: entry.clock_in || entry.clock_out || new Date(),
        }));

        return NextResponse.json(combinedClockings, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
