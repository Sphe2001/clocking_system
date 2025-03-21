import { connect } from "@/dbConfig/dbConfig";
import Admin from "@/models/adminModel";
import { NextResponse, NextRequest } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";

connect();

export async function POST(request: NextRequest) {
    try {
        const userId = await getDataFromToken(request);
        const user = await Admin.findOne({ _id: userId });

        if (!user) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 }
            );
        }

        await Admin.deleteOne({ _id: userId });

        return NextResponse.json(
            { message: "User deleted successfully" },
            { status: 200 }
        );

    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || "Internal Server Error" },
            { status: 500 }
        );
    }
}
