import { connect } from "@/dbConfig/dbConfig";
import Supervisor from "@/models/supervisorModel";
import { NextResponse, NextRequest } from "next/server";

connect();

export async function GET(request: NextRequest) {
    try {
        const supervisorCount = await Supervisor.countDocuments();

        return NextResponse.json({ supervisorCount }, { status: 200 });

        
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || "Internal Server Error" },
            { status: 500 }
        );
    }
}