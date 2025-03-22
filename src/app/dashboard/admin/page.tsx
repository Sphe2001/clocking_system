"use client";

import { useRouter } from "next/navigation";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function AdminDashboardPage() {
  const router = useRouter();

  type ClockingEntry = {
    date: string;
    role: string;
    name: string;
    clock_in: string | null;
    clock_out: string | null;
  };

  const [clockingData, setClockingData] = useState<ClockingEntry[]>([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalStudents, setTotalStudents] = useState(0);
  const [totalSupervisors, setTotalSupervisors] = useState(0);

  // State for managing popups
  const [showUsersModal, setShowUsersModal] = useState(false);
  const [showReportsModal, setShowReportsModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

  // Fetch clocking data & user counts
  useEffect(() => {
    const fetchClockingData = async () => {
      try {
        const response = await axios.get("/api/fetching-data"); // Adjust API endpoint
        console.log("Fetched data:", response.data);

        setClockingData(response.data as ClockingEntry[]);

        // Calculate role-based totals
        const total = response.data.length;
        const students = response.data.filter((user: ClockingEntry) => user.role === "Student").length;
        const supervisors = response.data.filter((user: ClockingEntry) => user.role === "Supervisor").length;

        setTotalUsers(total);
        setTotalStudents(students);
        setTotalSupervisors(supervisors);
      } catch (error) {
        console.error("Error fetching clocking data:", error);
      }
    };

    fetchClockingData();
  }, []);

  // Handle logout function
  const handleLogout = async () => {
    try {
      await axios.get("/api/logout");
      router.push("/adminlogin");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const closeModal = () => {
    //setShowUsersModal(false);
    setShowReportsModal(false);
    setShowProfileModal(false);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-6xl overflow-hidden">
        {/* Header */}
        <div className="bg-gray-800 text-white p-6 text-center">
          <h1 className="text-4xl font-bold">ClockIT</h1>
          <h2 className="text-2xl font-semibold mt-2">Admin Dashboard</h2>
        </div>

        <div className="flex">
          {/* Sidebar */}
          <div className="w-1/4 bg-gray-800 text-white p-6 flex flex-col min-h-full">
            <h2 className="text-2xl font-bold mb-6 text-center">Admin Panel</h2>
            <ul className="space-y-4 text-center">
              <li>
                <button
                  onClick={() => router.push("/dashboard/admin/users")}
                  className="block text-lg hover:text-gray-400"
                >
                  Users
                </button>
              </li>
              <li>
                <button
                  onClick={() => setShowReportsModal(true)}
                  className="block text-lg hover:text-gray-400"
                >
                  Reports
                </button>
              </li>
              <li>
                <button
                  onClick={() => setShowProfileModal(true)}
                  className="block text-lg hover:text-gray-400"
                >
                  Profile
                </button>
              </li>
            </ul>
            {/* Logout Button */}
            <div className="flex justify-center mt-6">
              <button
                className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="w-3/4 p-6">
            <h3 className="text-2xl font-semibold mb-6 text-center text-black">Clocking Daily Report</h3>

            {/* User Statistics */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-gray-100 p-4 rounded-lg text-center shadow">
                <h4 className="text-lg font-semibold text-black">Total Users</h4>
                <p className="text-2xl font-bold text-black">{totalUsers}</p>
              </div>
              <div className="bg-green-100 p-4 rounded-lg text-center shadow">
                <h4 className="text-lg font-semibold text-black">Total Students</h4>
                <p className="text-2xl font-bold text-black">{totalStudents}</p>
              </div>
              <div className="bg-blue-100 p-4 rounded-lg text-center shadow">
                <h4 className="text-lg font-semibold text-black">Total Supervisors</h4>
                <p className="text-2xl font-bold text-black">{totalSupervisors}</p>
              </div>
            </div>

            {/* Table Container */}
            <div className="overflow-x-auto">
              <table className="w-full table-auto border-collapse shadow-md rounded-lg">
                <thead className="bg-gray-700 text-white">
                  <tr>
                    <th className="p-4 text-center">Date</th>
                    <th className="p-4 text-center">Role</th>
                    <th className="p-4 text-center">Student/Staff Number</th>
                    <th className="p-4 text-center">Clocked In</th>
                    <th className="p-4 text-center">Clocked Out</th>
                  </tr>
                </thead>
                <tbody>
                  {clockingData.length > 0 ? (
                    clockingData.map((entry, index) => (
                      <tr key={index} className="border-b text-center">
                        <td className="p-4 text-black">{new Date(entry.date).toLocaleDateString()}</td>
                        <td className="p-4 text-black">{entry.role}</td>
                        <td className="p-4 text-black">{entry.name}</td>
                        <td className="p-4 text-black">{entry.clock_in ? new Date(entry.clock_in).toLocaleTimeString() : "N/A"}</td>
                        <td className="p-4 text-black">{entry.clock_out ? new Date(entry.clock_out).toLocaleTimeString() : "N/A"}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="p-4 text-center text-gray-500">No records found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            

          </div>
        </div>
      </div>

      {/* Modals */}
      {showUsersModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-20">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-6xl w-full">
            <h3 className="text-2xl font-semibold mb-4">Users</h3>

            {/* Students Table */}
            <div className="mb-6">
              <h4 className="text-xl font-semibold text-black mb-4">Students</h4>
              <table className="w-full table-auto border-collapse shadow-md rounded-lg">
                <thead className="bg-gray-700 text-white">
                  <tr>
                    <th className="p-4 text-center">Name</th>
                    <th className="p-4 text-center">Student ID</th>
                    <th className="p-4 text-center">Role</th>
                    <th className="p-4 text-center">Clocked In</th>
                    <th className="p-4 text-center">Clocked Out</th>
                  </tr>
                </thead>
                <tbody>
                  {clockingData.filter(entry => entry.role === "Student").map((entry, index) => (
                    <tr key={index} className="border-b text-center">
                      <td className="p-4 text-black">{entry.name}</td>
                      <td className="p-4 text-black">{entry.name}</td> {/* Assuming name is ID for now */}
                      <td className="p-4 text-black">{entry.role}</td>
                      <td className="p-4 text-black">{entry.clock_in ? new Date(entry.clock_in).toLocaleTimeString() : "N/A"}</td>
                      <td className="p-4 text-black">{entry.clock_out ? new Date(entry.clock_out).toLocaleTimeString() : "N/A"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Supervisors Table */}
            <div>
              <h4 className="text-xl font-semibold text-black mb-4">Supervisors</h4>
              <table className="w-full table-auto border-collapse shadow-md rounded-lg">
                <thead className="bg-gray-700 text-white">
                  <tr>
                    <th className="p-4 text-center">Name</th>
                    <th className="p-4 text-center">Staff ID</th>
                    <th className="p-4 text-center">Role</th>
                    <th className="p-4 text-center">Clocked In</th>
                    <th className="p-4 text-center">Clocked Out</th>
                  </tr>
                </thead>
                <tbody>
                  {clockingData.filter(entry => entry.role === "Supervisor").map((entry, index) => (
                    <tr key={index} className="border-b text-center">
                      <td className="p-4 text-black">{entry.name}</td>
                      <td className="p-4 text-black">{entry.name}</td> {/* Assuming name is ID for now */}
                      <td className="p-4 text-black">{entry.role}</td>
                      <td className="p-4 text-black">{entry.clock_in ? new Date(entry.clock_in).toLocaleTimeString() : "N/A"}</td>
                      <td className="p-4 text-black">{entry.clock_out ? new Date(entry.clock_out).toLocaleTimeString() : "N/A"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <button onClick={closeModal} className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">Close</button>
          </div>
        </div>
      )}

      {showReportsModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-20">
          {/* Reports Modal */}
        </div>
      )}

      {showProfileModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-20">
          {/* Profile Modal */}
        </div>
      )}
    </div>
  );
}
