import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/supervisorModel";
import { NextResponse, NextRequest } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";

connect();

export async function POST(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);

    if (!userId) {
      return NextResponse.json({ error: "User not found" }, { status: 400 });
    }

    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (user.clock_in) {
      const lastClockInDate = new Date(user.clock_in).toDateString();
      const todayDate = new Date().toDateString();

      if (lastClockInDate === todayDate) {
        return NextResponse.json(true);
      }
    }

    return NextResponse.json(false);
  } catch (error: any) {
    console.error("Error in clocking", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
