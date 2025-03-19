"use client";

import React from "react";

export default function AdminDashboardPage() {
  return (
    <div className="flex h-screen bg-gray-100">
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
            <a href="#" className="text-lg hover:text-gray-400">Reports</a>
          </li>
          <li className="mb-6">
            <a href="#" className="text-lg hover:text-gray-400">Profile</a>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
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
  );
}
