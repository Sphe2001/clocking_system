
import { connect } from "@/dbConfig/dbConfig";
import Student from "@/models/studentModel";
import { NextRequest, NextResponse } from "next/server";
connect();



export async function GET() {
    try {

        
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || 'Internal Server Error' },
            { status: 500 }
        );
    }
}