import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/studentModel";
import { NextResponse, NextRequest } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";

connect();

export async function POST(request: NextRequest) {
    try {
        // Extract userId from token
        const userId = await getDataFromToken(request);

        
        if (!userId) {
            return NextResponse.json({ error: "User not found" }, { status: 400 });
        }

        // Find the user in the database
        const user = await User.findById(userId);

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // Update clock_in field with the current timestamp
        user.clock_in = new Date(); 
        await user.save();

        return NextResponse.json({
            message: "Clock-in successful",
            success: true,
        });

    } catch (error: any) {
        console.error("Error in clock-in:", error);
        return NextResponse.json(
            { error: error.message || "Internal Server Error" },
            { status: 500 }
        );
    }

