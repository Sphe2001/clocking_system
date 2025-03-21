"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";

export default function DashboardPage() {
  const router = useRouter();
  const [attendanceTime, setAttendanceTime] = useState<string | null>(null);
  const [endSessionTime, setEndSessionTime] = useState<string | null>(null);

  const handleSignAttendance = () => {
    const timestamp = new Date().toLocaleString();
    setAttendanceTime(timestamp);
  };

  const handleEndSession = () => {
    const timestamp = new Date().toLocaleString();
    setEndSessionTime(timestamp);
  };

  const handleLogout = async () => {
    await axios.get("/api/logout");
    router.push("/");
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-r from-indigo-500 to-purple-600">
      {/* Navbar */}
      <nav className="bg-gray-900 text-white p-4 shadow-md fixed w-full top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Dashboard</h1>
          <div className="flex-1"></div> {/* Empty space to push links to center */}

          {/* Centered Links */}
          <div className="flex-1 flex justify-center space-x-6 mr-20">
            <Link href="/dashboard/supervisor/viewStudents" className="hover:text-gray-300">
              View Students
            </Link>
            <Link href="/dashboard/supervisor/viewProfile" className="hover:text-gray-300">
              View Profile
            </Link>
          </div>

          {/* Logout Button (Right) */}
          <div className="flex-1 flex justify-end">
            <button
              onClick={handleLogout}
              className="bg-red-600 px-4 py-2 rounded-lg hover:bg-red-800 transition-all"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center relative text-white p-4 sm:p-8 md:p-16 pt-20">
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
        <div className="relative z-10 max-w-lg w-full space-y-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
            Welcome!
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
              disabled={!attendanceTime} // Disable the button if attendanceTime is not set
            >
              End Session
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
