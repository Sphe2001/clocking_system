"use client";

import React, { useState } from "react";
import axios from "axios";
import SupervisorNavbar from "@/app/components/supervisor/Navbar";
import { UserIcon, UsersIcon,TableCellsIcon } from "@heroicons/react/16/solid";
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

   
  const handleAssignTask = async () => {
    if (!task.trim()) {
      toast.error("Please provide a task description.");
      return;
    }
    
    const studentUsername = "exampleStudent"; // Replace this with the selected student
    try {
      const response = await axios.post("/api/tasks/assign", { task, studentUsername });
      if (response.data.success) {
        setTaskList([...taskList, task]);
        setTask(""); // Reset the task input
        toast.success("Task assigned successfully!");
      }
    } catch (error:any) {
      toast.error("Error assigning task");
    }
  };
  
  const handleFetchTasks = async (status: string) => {
    try {
      const response = await axios.get(`/api/tasks?status=${status}`);
      setTaskList(response.data);
    } catch (error) {
      toast.error("Error fetching tasks");
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
      {/* Navbar */}
      <SupervisorNavbar />


      <div className="flex flex-col items-center bg-gradient-to-b from-blue-300  justify-center min-h-screen relative text-white px-6 sm:px-8 md:px-12">
        
        {/* Content */}
        <div className="relative z-10 max-w-lg w-full text-center space-y-6 p-8 bg-gradient-to-b from-blue-400 to-white bg-opacity-10 backdrop-blur-md rounded-lg shadow-lg">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-black">Welcome, Supervisor!</h1>
          <p className="text-lg sm:text-xl text-black">Click below to sign your attendance or end the session.</p>


          <button
            onClick={handleSignAttendance}
            className="w-full max-w-xs p-3 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-800 transition-all"
          >
            Sign Attendance
          </button>

          <button
            onClick={handleEndSession}
            className={`w-full max-w-xs p-3 text-lg font-semibold text-white rounded-lg transition-all ${
              attendanceTime
                ? "bg-red-600 hover:bg-red-800"
                : "bg-red-400 cursor-not-allowed opacity-50"
            }`}
            disabled={!attendanceTime}
          >
            End Session
          </button>

          {/* Attendance Time Display */}
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
