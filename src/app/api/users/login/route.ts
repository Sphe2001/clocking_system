

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // Example login logic (Replace this with actual authentication)
    if (email === "admin@example.com" && password === "password123") {
      return NextResponse.json({ message: "Login successful" }, { status: 200 });
    } else {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}