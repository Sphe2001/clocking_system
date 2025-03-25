"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "@/app/components/student/Navbar";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const [canEndSession, setCanEndSession] = useState<boolean>(false);
  const [attendanceTime, setAttendanceTime] = useState<string | null>(null);
  const [endSessionTime, setEndSessionTime] = useState<string | null>(null);

  useEffect(() => {
    // Check if the user is authorized
    const checkAuthorization = async () => {
      try {
        const response = await axios.get("/api/auth/student");
        if (response.data) {
          setIsAuthorized(true);
        } else {
          setIsAuthorized(false);
          router.push("/"); // Redirect to login if unauthorized
        }
      } catch (error) {
        setIsAuthorized(false);
        router.push("/"); // Redirect to login on error
      }
    };

    checkAuthorization();
  }, [router]);

  useEffect(() => {
    // Check if the user has clocked in today
    const checkClockInStatus = async () => {
      try {
        const response = await axios.post("/api/clocking/student/status");
        if (response.data === true) {
          setCanEndSession(true);
        } else {
          setCanEndSession(false);
        }
      } catch (error) {
        setCanEndSession(false);
      }
    };

    checkClockInStatus();
  }, []);

  if (isAuthorized === null) {
    return (
      <p className="text-center text-gray-600 mt-10">
        Checking authorization...
      </p>
    );
  }

  if (!isAuthorized) {
    return null; // Prevents rendering if unauthorized
  }

  const handleSignAttendance = async () => {
    try {
      const response = await axios.post("/api/clocking/student/clocking_in");
      if (response.data.success) {
        const timestamp = new Date().toLocaleString();
        setAttendanceTime(timestamp);
        setCanEndSession(true); // Enable end session button after clock-in
        toast.success("Clock-in successful");
      } else {
        toast.error("Clock-in failed");
      }
    } catch (error) {
      toast.error("Already Clocked in");
    }
  };

  const handleEndSession = async () => {
    try {
      const response = await axios.post("/api/clocking/student/clocking_out");
      if (response.data.success) {
        const timestamp = new Date().toLocaleString();
        setEndSessionTime(timestamp);
        setCanEndSession(false); // Disable end session button after clock-out
        toast.success("Clock-out successful");
      } else {
        toast.error("Clock-out failed");
      }
    } catch (error) {
      toast.error("Already clocked out");
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
          <h1 className="text-4xl sm:text-5xl font-extrabold text-black">
            Welcome, Student!
          </h1>
          <p className="text-lg sm:text-xl text-black">
            Click below to sign your attendance or end the session.
          </p>

          <button
            onClick={handleSignAttendance}
            className="w-full max-w-xs p-3 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-800 transition-all"
          >
            Sign Attendance
          </button>

          <button
            onClick={handleEndSession}
            className={`w-full max-w-xs p-3 text-lg font-semibold text-white rounded-lg transition-all ${
              canEndSession
                ? "bg-red-600 hover:bg-red-800"
                : "bg-red-400 cursor-not-allowed opacity-50"
            }`}
            disabled={!canEndSession}
          >
            End Session
          </button>

          <div className="mt-4 text-white">
            {attendanceTime && (
              <p className="text-lg">You signed in at: {attendanceTime}</p>
            )}
            {endSessionTime && (
              <p className="text-lg">You signed out at: {endSessionTime}</p>
            )}
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
}
