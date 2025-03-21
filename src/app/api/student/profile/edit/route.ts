import { connect } from "@/dbConfig/dbConfig";
import Student from "@/models/studentModel";
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

        const user = await Student.findById(userId);

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const checkEmail = await Student.findOne({ email });
        if (checkEmail) {
            return NextResponse.json(
            { error: "Email already exist" },
            { status: 409 }
            );}


        if (email) user.email = email;
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