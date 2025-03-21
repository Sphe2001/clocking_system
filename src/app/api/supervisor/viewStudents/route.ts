import { connect } from "@/dbConfig/dbConfig";
import Student from "@/models/studentModel";
import { NextResponse, NextRequest } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import Supervisor from "@/models/supervisorModel";

connect();



export async function GET(request: NextRequest) {
    try {
        const userId = await getDataFromToken(request);
                    const user = await Supervisor.findOne({ _id: userId }).select("-password");
                if(!user){
                    return NextResponse.json({
                        message: "Access denied",
                      });
                } 

        const studentClockings = await Student.find({}, "username surname initials role clock_in clock_out").limit(20).lean();

        const combinedClockings = [...studentClockings].map(entry => ({
                    username: entry.username,
                    surname: entry.surname,
                    initials: entry.initials,
                    role: entry.role,
                    clock_in: entry.clock_in ? formatDateTime(entry.clock_in) : null,
                    clock_out: entry.clock_out ? formatDateTime(entry.clock_out) : null,
                    date: entry.clock_in || entry.clock_out ? formatDateTime(entry.clock_in || entry.clock_out) : formatDateTime(new Date()),
                }));
        
        return NextResponse.json(combinedClockings, { status: 200 });

        
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || 'Internal Server Error' },
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