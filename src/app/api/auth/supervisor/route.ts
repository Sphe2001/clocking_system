import { connect } from "@/dbConfig/dbConfig";
import { NextResponse, NextRequest } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import Supervisor from "@/models/supervisorModel";

connect();

export async function GET(request: NextRequest) {
    try {
        const userId = await getDataFromToken(request);
        const user = await Supervisor.findOne({ _id: userId }).select("-password");
        if (!user) {
            return NextResponse.json(false, { status: 403 });
        }

        return NextResponse.json(true, { status: 200 });
        
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || "Internal Server Error" },
            { status: 500 }
        );
    }
}