import { connect } from "@/dbConfig/dbConfig";
import Supervisor from "@/models/supervisorModel";
import { NextResponse, NextRequest } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, surname, initials, contactNo } = reqBody;

        const userId = await getDataFromToken(request);

        if (!userId) {
            return NextResponse.json({ error: "User not found" }, { status: 400 });
        }

        const user = await Supervisor.findById(userId);

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        if (surname) user.surname = surname;
        if (initials) user.initials = initials;
        if (contactNo) user.contactNo = contactNo;

        await user.save();

        return NextResponse.json({
            message: "Profile information updated successfully",
            success: true,
        });

    } catch (error: any) {
        console.error("Error updating user information:", error);
        return NextResponse.json(
            { error: error.message || "Internal Server Error" },
            { status: 500 }
        );
    }
}
