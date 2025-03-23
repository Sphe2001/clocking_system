"use client";

import React, { useState } from "react";
import axios from "axios";
import Navbar from "@/app/components/student/Navbar";
import toast, { Toaster } from 'react-hot-toast';

export default function DashboardPage() {

  const [attendanceTime, setAttendanceTime] = useState<string | null>(null);
  const [endSessionTime, setEndSessionTime] = useState<string | null>(null);

  const handleSignAttendance = async () => {
     
    try {
      const response = await axios.post("/api/clocking/student/clocking_in");
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
      const response = await axios.post("/api/clocking/student/clocking_out");
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


  return (
    <div

      className="relative min-h-screen bg-center "
      style={{
        backgroundImage: `url('/images/15.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Navbar />
      
      <div className="flex flex-col items-center justify-center min-h-screen relative text-white px-6 sm:px-8 md:px-12">
        
     
        <div className="relative z-10 max-w-lg w-full text-center space-y-6 p-8 bg-white bg-opacity-10 backdrop-blur-md rounded-lg shadow-lg">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-black">Welcome, Student!</h1>
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
