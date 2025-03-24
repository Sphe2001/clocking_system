"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "@/app/components/student/Navbar";
import React from "react";

const ViewAttendanceHistory = () => {
  const [attendanceHistory, setAttendanceHistory] = useState([]);
  const [isAuthorized, setIsAuthorized] = useState(true);

  useEffect(() => {
    const fetchAttendanceHistory = async () => {
      try {
        const response = await axios.get("/api/attendance/students/individualHistory");
        console.log("API Response:", response.data);

        // Format the data
        const formattedData = response.data.map((entry) => ({
          ...entry,
          clock_in: parseDate(entry.clock_in),
          clock_out: parseDate(entry.clock_out),
        }));

        setAttendanceHistory(formattedData);
      } catch (error) {
        console.error("Error fetching attendance:", error);
      }
    };

    // Check authorization before fetching attendance
    const checkAuthorization = async () => {
      try {
        const authResponse = await axios.get("/api/auth/student");
        if (!authResponse.data) {
          setIsAuthorized(false);
        } else {
          fetchAttendanceHistory();
        }
      } catch (error) {
        setIsAuthorized(false);
      }
    };

    checkAuthorization();
  }, []);

  // Function to parse a date string in the format "DD/MM/YYYY HH:MM"
  const parseDate = (dateString) => {
    if (!dateString) return null;

    const [datePart, timePart] = dateString.split(" ");
    const [day, month, year] = datePart.split("/").map((num) => parseInt(num, 10));
    const [hour, minute] = timePart.split(":").map((num) => parseInt(num, 10));

    return new Date(year, month - 1, day, hour, minute); // month is 0-indexed
  };

  // Format the date to something more readable
  const formatDate = (date) => {
    if (!date) return "N/A";
    return date.toLocaleDateString("en-GB") + " " + date.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="container mx-auto p-4">
        <Navbar />
      <h2 className="text-2xl font-bold mb-4">Attendance History</h2>
      {attendanceHistory.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {attendanceHistory.map((entry, index) => (
            <div key={index} className="p-4 border rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold">{entry.username}</h3>
              <p className="text-gray-600">Role: {entry.role}</p>

              {/* Render attendance data in pairs */}
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <strong>Clock-in:</strong>
                  <p className="text-sm">{formatDate(entry.clock_in)}</p>
                </div>
                <div>
                  <strong>Clock-out:</strong>
                  <p className="text-sm">{formatDate(entry.clock_out)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No attendance records found.</p>
      )}
    </div>
  );
};

export default ViewAttendanceHistory;
