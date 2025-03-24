"use client";

import React, { useState } from "react";
import axios from "axios";
import SupervisorNavbar from "@/app/components/supervisor/Navbar";
import toast, { Toaster } from 'react-hot-toast';

export default function DashboardPage() {
  const [attendanceTime, setAttendanceTime] = useState<string | null>(null);
  const [endSessionTime, setEndSessionTime] = useState<string | null>(null);
  const [task, setTask] = useState("");
  const [taskList, setTaskList] = useState<string[]>([]);

  const handleSignAttendance = async () => {
    try {
      const response = await axios.post("/api/clocking/supervisor/clocking_in");
      if (response.data.success) {
        const timestamp = new Date().toLocaleString();
        setAttendanceTime(timestamp);
        toast.success("Clock-in successful");
      } else {
        toast.error("Clock-in failed");
      }
    } catch (error) {
      toast.error("Error while clocking in");
    }
  };

  const handleEndSession = async () => {
    try {
      const response = await axios.post("/api/clocking/supervisor/clocking_out");
      if (response.data.success) {
        const timestamp = new Date().toLocaleString();
        setEndSessionTime(timestamp);
        toast.success("Clock-out successful");
      } else {
        toast.error("Clock-out failed");
      }
    } catch (error) {
      toast.error("Error while clocking out");
    }
  };

  const handleAddTask = async () => {
    if (!task.trim()) {
      toast.error("Task cannot be empty");
      return;
    }
    try {
      const response = await axios.post("/api/tasks", { task });
      if (response.data.success) {
        setTaskList([...taskList, task]);
        setTask("");
        toast.success("Task added successfully");
      }
    } catch (error) {
      toast.error("Error adding task");
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-r from-indigo-500 to-purple-600"
      style={{
        backgroundImage: `url('/images/15.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <SupervisorNavbar />
      <div className="flex flex-col items-center justify-center min-h-screen relative text-white px-6 sm:px-8 md:px-12">
        <div className="relative z-10 max-w-lg w-full text-center space-y-6 p-8 bg-white bg-opacity-10 backdrop-blur-md rounded-lg shadow-lg">
          <p className="text-lg sm:text-xl text-black">Manage student tasks.</p>
         

          <div className="mt-4">
            <input
              type="text"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              className="p-2 rounded text-black w-full"
              placeholder="Enter a task"
            />
            <button
              onClick={handleAddTask}
              className="mt-2 w-full p-3 bg-green-600 text-white text-lg font-semibold rounded-lg hover:bg-green-800 transition-all"
            >
              Add Task
            </button>
          </div>

          {taskList.length > 0 && (
            <ul className="mt-4 text-black bg-white bg-opacity-20 p-4 rounded-lg">
              {taskList.map((t, index) => (
                <li key={index} className="text-lg">• {t}</li>
              ))}
            </ul>
          )}

          <div className="mt-4 text-white">
            {attendanceTime && <p className="text-lg">You signed in at: {attendanceTime}</p>}
            {endSessionTime && <p className="text-lg">You signed out at: {endSessionTime}</p>}
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
}
