// /api/tasks.js (for fetching tasks by status)
import Task from "@/models/taskModel";
import { NextResponse } from "next/server";

export async function GET(request: { query: { status: any; }; }) {
  try {
    const { status } = request.query; // Either "Ongoing" or "Completed"
    const tasks = await Task.find({ status }).lean();

    return NextResponse.json(tasks, { status: 200 });
  } catch (error:any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}