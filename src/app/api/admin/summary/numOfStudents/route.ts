import { connect } from "@/dbConfig/dbConfig";
import Student from "@/models/studentModel";
import { NextResponse, NextRequest } from "next/server";

connect();

export async function GET(request: NextRequest) {
    try {
        const studentCount = await Student.countDocuments();

        return NextResponse.json({ studentCount }, { status: 200 });

        
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || "Internal Server Error" },
            { status: 500 }
        );
    }
}