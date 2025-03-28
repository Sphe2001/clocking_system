// /api/tasks/status.js (for updating task status to completed)
import Task from "@/models/taskModel";
import { NextResponse } from "next/server";

export async function POST(request: { json: () => PromiseLike<{ taskId: any; status: any; }> | { taskId: any; status: any; }; }) {
  try {
    const { taskId, status } = await request.json();

    const task = await Task.findById(taskId);
    if (!task) {
      return NextResponse.json({ message: "Task not found" }, { status: 404 });
    }

    task.status = status; // "Completed" or "Ongoing"
    await task.save();

    return NextResponse.json({ message: "Task updated successfully", success: true }, { status: 200 });
  } catch (error:any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}