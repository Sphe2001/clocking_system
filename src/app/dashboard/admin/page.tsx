'use client';

import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import React from "react";

export default function AdminDashboardPage() {
  const router = useRouter();

  // Define the handleLogout function
  const handleLogout = async () => {
    try {
      // Send a GET request to the logout API endpoint
      await axios.get("/api/logout");

      // Redirect to the login page after logging out
      router.push("/adminlogin");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-r from-indigo-500 to-purple-600">
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center relative p-4 sm:p-8 md:p-16 text-center text-white bg-opacity-60">
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
        <div className="relative z-10 max-w-6xl w-full space-y-8">
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight">ClockIT</h1>
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
            Admin Dashboard
          </h1>

          <div className="flex flex-grow">
            {/* Sidebar */}
            <div className="flex flex-col items-center justify-start w-64 bg-gray-800 text-white p-6 min-h-screen">
              <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>
              <ul className="flex flex-col items-center space-y-6">
                <li>
                  <a href="#" className="text-lg hover:text-gray-400">Users</a>
                </li>
                <li>
                  <Link href="../../Reports" className="text-lg hover:text-gray-400">
                    Reports
                  </Link>
                </li>
                <li>
                  <Link href="../../Profile" className="text-lg hover:text-gray-400">
                    Profile
                  </Link>
                </li>
              </ul>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6 bg-white rounded-lg shadow-md overflow-auto min-h-screen">
              {/* Top Navigation Bar */}
              <div className="flex items-center justify-between mb-6">
                <button
                  className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>

              {/* Dashboard Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
                {/* Card 1 */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <p className="text-gray-600 mt-2">Total number of registered users.</p>
                  <p className="text-gray-600 mt-2">22</p>
                </div>

                {/* Card 2 */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <p className="text-gray-600 mt-2">Total who did not clock in.</p>
                  <p className="text-gray-600 mt-2">33</p>
                </div>

                {/* Card 3 */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <p className="text-gray-600 mt-2">Total who clocked in.</p>
                  <p className="text-gray-600 mt-2">6</p>
                </div>
              </div>

              {/* Clocking Daily Report Table */}
              <div className="mt-8">
                <h3 className="text-2xl font-semibold mb-4">Clocking Daily Report</h3>
                <div className="overflow-auto">
                  <table className="min-w-full table-auto bg-white shadow-md rounded-lg">
                    <thead className="bg-gray-700 text-white">
                      <tr>
                        <th className="p-4 text-left">Date</th>
                        <th className="p-4 text-left">Stude/Supervisor</th>
                        <th className="p-4 text-left">Details</th>
                        <th className="p-4 text-left">Clocked In</th>
                        <th className="p-4 text-left">Clocked Out</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="p-4 text-sm md:text-base text-black">March 19, 2025</td>
                        <td className="p-4 text-sm md:text-base text-black">Supervisor</td>
                        <td className="p-4 text-sm md:text-base text-black">John Doe</td>
                        <td className="p-4 text-sm md:text-base text-black">08:00 AM</td>
                        <td className="p-4 text-sm md:text-base text-black">05:00 PM</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-4 text-sm md:text-base text-black">March 19, 2025</td>
                        <td className="p-4 text-sm md:text-base text-black">Supervisor</td>
                        <td className="p-4 text-sm md:text-base text-black">John Doe</td>
                        <td className="p-4 text-sm md:text-base text-black">08:00 AM</td>
                        <td className="p-4 text-sm md:text-base text-black">05:00 PM</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-4 text-sm md:text-base text-black">March 19, 2025</td>
                        <td className="p-4 text-sm md:text-base text-black">Supervisor</td>
                        <td className="p-4 text-sm md:text-base text-black">John Doe</td>
                        <td className="p-4 text-sm md:text-base text-black">08:00 AM</td>
                        <td className="p-4 text-sm md:text-base text-black">05:00 PM</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-4 text-sm md:text-base text-black">March 19, 2025</td>
                        <td className="p-4 text-sm md:text-base text-black">Supervisor</td>
                        <td className="p-4 text-sm md:text-base text-black">John Doe</td>
                        <td className="p-4 text-sm md:text-base text-black">08:00 AM</td>
                        <td className="p-4 text-sm md:text-base text-black">05:00 PM</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
