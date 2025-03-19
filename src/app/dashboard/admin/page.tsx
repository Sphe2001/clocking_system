"use client";

import Link from "next/link";
import React from "react";

export default function AdminDashboardPage() {
  return (
    <div className="relative min-h-screen bg-gradient-to-r from-indigo-500 to-purple-600">
      {/* Admin Link */}
      <div className="absolute top-4 right-4 z-10">
        <Link
          href={"/adminlogin"}
          className="p-2 bg-gray-800 text-white rounded-full hover:bg-gray-900 transition-all"
        >
          Admin Login
        </Link>
      </div>

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center relative p-4 sm:p-8 md:p-16 text-center text-white bg-opacity-60">
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
        <div className="relative z-10 max-w-6xl w-full space-y-8">
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
            Admin Dashboard
          </h1>

          <div className="flex space-x-6">
            {/* Sidebar */}
            <div className="w-64 bg-gray-800 text-white p-6">
              <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>
              <ul>
                <li className="mb-6">
                  <a href="#" className="text-lg hover:text-gray-400">Dashboard</a>
                </li>
                <li className="mb-6">
                  <a href="#" className="text-lg hover:text-gray-400">Users</a>
                </li>
                <li className="mb-6">
                  <Link href={"/Reports"} className="text-lg hover:text-gray-400">
                    Reports
                  </Link>
                </li>
                <li className="mb-6">
                  <Link href={"/Profile"} className="text-lg hover:text-gray-400">
                    Profile
                  </Link>
                </li>
              </ul>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6 bg-white rounded-lg shadow-md">
              {/* Top Navigation Bar */}
              <div className="flex items-center justify-between mb-6">
                <div className="text-xl font-semibold">Welcome to Admin Dashboard</div>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                  Logout
                </button>
              </div>

              {/* Dashboard Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Card 1 */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold mb-4">Total employees</h3>
                  <div className="text-3xl font-bold">1,200</div>
                  <p className="text-gray-600 mt-2">Total number of registered users.</p>
                </div>

                {/* Card 2 */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold mb-4">New Registrations</h3>
                  <div className="text-3xl font-bold">350</div>
                  <p className="text-gray-600 mt-2">New users who signed up this week.</p>
                </div>

                {/* Card 3 */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold mb-4">Total who clocked in</h3>
                  <div className="text-3xl font-bold">27</div>
                  <p className="text-gray-600 mt-2">Total who clocked in.</p>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="mt-8">
                <h3 className="text-2xl font-semibold mb-4">Recent Activity</h3>
                <table className="min-w-full table-auto bg-white shadow-md rounded-lg">
                  <thead className="bg-gray-700 text-white">
                    <tr>
                      <th className="p-4 text-left">User</th>
                      <th className="p-4 text-left">Action</th>
                      <th className="p-4 text-left">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-4">John Doe</td>
                      <td className="p-4">Signed up</td>
                      <td className="p-4">March 19, 2025</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-4">Jane Smith</td>
                      <td className="p-4">Updated Profile</td>
                      <td className="p-4">March 18, 2025</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-4">Mike Johnson</td>
                      <td className="p-4">Requested Approval</td>
                      <td className="p-4">March 17, 2025</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
