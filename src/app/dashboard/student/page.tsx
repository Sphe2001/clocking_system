"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function DashboardPage() {
  const router = useRouter();
  const [attendanceTime, setAttendanceTime] = useState<string | null>(null);
  const [endSessionTime, setEndSessionTime] = useState<string | null>(null);

  const handleSignAttendance = async () => {
    console.log("Sign Attendance Button Clicked");  // Debugging log
    try {
      const response = await axios.post("/api/clocking/student/clocking_in");
      if (response.data.success) {
        const timestamp = new Date().toLocaleString();
        setAttendanceTime(timestamp);
        console.log("Clock-in successful:", response.data);
      } else {
        console.error("Clock-in failed:", response.data.error);
      }
    } catch (error) {
      console.error("Error while clocking in:", error);
    }
  };
  

  const handleEndSession = async () => {
    console.log("End Session Button Clicked");  // Debugging log
    try {
      const response = await axios.post("/api/clocking/student/clocking_out");
      if (response.data.success) {
        const timestamp = new Date().toLocaleString();
        setEndSessionTime(timestamp);
        console.log("Clock-out successful:", response.data);
      } else {
        console.error("Clock-out failed:", response.data.error);
      }
    } catch (error) {
      console.error("Error while clocking out:", error);
    }
  };

  const handleLogout = () => {
    const response = axios.get("/api/logout");
    router.push("/");
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-r from-indigo-500 to-purple-600 p-6">
      
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center relative text-white p-4 sm:p-8 md:p-16">
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
        <div className="relative z-10 max-w-lg w-full space-y-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
            Welcome !
          </h1>
          <p className="text-lg sm:text-xl mb-8">
            Click below to sign your attendance or end the session.
          </p>

          {/* Attendance Button */}
          <button
            onClick={handleSignAttendance}
            className="mb-4 p-3 w-64 bg-blue-600 text-white rounded-lg hover:bg-blue-800 transition-all"
          >
            Sign Attendance
          </button>

          {/* End Session Button */}
            <button
              onClick={handleEndSession}
              className={`mb-4 p-3 w-64 text-white rounded-lg transition-all ${
                attendanceTime
                  ? "bg-red-600 hover:bg-red-800"
                  : "bg-red-400 cursor-not-allowed opacity-50"
              }`}
                disabled={!attendanceTime}// Disable the button if attendanceTime is not set
            >
              End Session
            </button>



          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="p-3 w-64 bg-gray-600 text-white rounded-lg hover:bg-gray-800 transition-all"
          >
            Logout
          </button>

          {/* Attendance & End Time Display */}
          <div className="mt-6 text-center text-black">
            {attendanceTime && (
              <p className="text-lg">You signed in at: {attendanceTime}</p>
            )}
            {endSessionTime && (
              <p className="text-lg">You signed out at: {endSessionTime}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
