"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

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

  const handleLogout = () => {
    // If using localStorage/sessionStorage for tokens
    localStorage.removeItem("token"); // Adjust based on your auth mechanism

    // Redirect to login page
    router.push("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      <p className="mb-4 text-lg font-semibold">
        Click below to sign attendance
      </p>

      <button
        onClick={handleSignAttendance}
        className="mb-2 p-3 w-64 bg-blue-600 text-white rounded-lg hover:bg-blue-800"
      >
        Sign Attendance
      </button>

      <button
        onClick={handleEndSession}
        className="mb-2 p-3 w-64 bg-red-600 text-white rounded-lg hover:bg-red-800"
      >
        End Session
      </button>

      <button
        onClick={handleLogout}
        className="p-3 w-64 bg-gray-600 text-white rounded-lg hover:bg-gray-800"
      >
        Logout
      </button>

      <div className="mt-4 text-center text-black">
        {attendanceTime && <p>You signed in at: {attendanceTime}</p>}
        {endSessionTime && <p>You signed out at: {endSessionTime}</p>}
      </div>
    </div>
  );
}
