"use client";

import Link from 'next/link';
import React from 'react';
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import axios from "axios";


const UsersPage = () => {
  const router = useRouter();
    const [attendance, setAttendance] = useState<any>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 20;
  
    useEffect(() => {
      fetch("/api/attendance/students")
        .then((res) => res.json())
        .then((data) => setAttendance(data));
    }, []);
  
    const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  
    if (!attendance) {
      return <p className="text-center text-gray-600 mt-10">Loading attendance records...</p>;
    }
  
    const users = Object.keys(attendance);
    const totalPages = Math.ceil(users.length / recordsPerPage);
    const startIndex = (currentPage - 1) * recordsPerPage;
    const selectedUsers = users.slice(startIndex, startIndex + recordsPerPage);

    const handleNavigation = (path: string) => {
      router.push(path);
    };

    const handleLogout = async () => {
      await axios.get("/api/logout");
      router.push("/adminlogin");
    };

    return (
            <div className="flex h-screen">
              {/* Sidebar */} 
                <aside className="w-1/4 bg-blue-700 text-white p-5">
                  <h1 className="text-2xl font-bold mb-8">ADMIN PANEL</h1>
                  <nav className="space-y-4">
                    <div
                      className="p-2 cursor-pointer hover:bg-blue-500 rounded"
                      onClick={() => handleNavigation("/dashboard/admin")}
                    >
                      Dashboard
                    </div>
                    <div
                      className="p-2 cursor-pointer hover:bg-blue-500 rounded"
                      onClick={() => handleNavigation("/dashboard/admin/users")}
                    >
                      Users
                    </div>
                    <div
                      className="p-2 cursor-pointer hover:bg-blue-500 rounded"
                      onClick={() => handleNavigation("/dashboard/admin/reports")}
                    >
                      Reports
                    </div>
                    <div
                      className="p-2 cursor-pointer hover:bg-blue-500 rounded"
                      onClick={() => handleNavigation("/dashboard/admin/profile")}
                    >
                      Profile
                    </div>
                    <div
                      className="p-2 cursor-pointer hover:bg-red-500 rounded"
                      onClick={handleLogout}
                    >
                      Logout
                    </div>
                  </nav>
                </aside>

              {/* Main Content */}
                <div className="flex-grow p-6 bg-gray-100 overflow-y-auto">
                  <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">Attendance Records</h2>

                  <div className="overflow-x-auto max-h-[70vh] border border-gray-300 rounded-lg shadow-md">
                    <table className="table-auto w-full border-collapse text-sm">
                      <thead className="bg-gray-200 sticky top-0">
                        <tr>
                          <th className="border px-4 py-2 text-left text-black">Name</th>
                          <th className="border px-4 py-2 text-left text-black">Role</th>
                          {weekdays.map((day) => (
                            <th key={day} className="border px-4 py-2 text-center text-black">{day}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y">
                        {selectedUsers.map((email) => {
                          const user = attendance[email];
                          return (
                            <tr key={email} className="hover:bg-gray-100">
                              <td className="border px-4 py-2 text-black">{user.name}</td>
                              <td className="border px-4 py-2 text-black">{user.role}</td>
                              {weekdays.map((day) => (
                                <td key={day} className="border px-4 py-2 text-center">
                                  <span className={
                                    user.attendance[day] === "Attended"
                                      ? "text-green-600 font-semibold"
                                      : user.attendance[day] === "Absent"
                                      ? "text-red-600 font-semibold"
                                      : "text-yellow-600 font-semibold"
                                  }>
                                    {user.attendance[day] || "Pending"}
                                  </span>
                                </td>
                              ))}
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination Controls */}
                  {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-4 mt-4">
                      <button
                        className={`px-4 py-2 border rounded-md ${
                          currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"
                        }`}
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                      >
                        Previous
                      </button>

                      <span className="text-gray-700">
                        Page {currentPage} of {totalPages}
                      </span>

                      <button
                        className={`px-4 py-2 border rounded-md ${
                          currentPage === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"
                        }`}
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                      >
                        Next
                      </button>
                    </div>
                  )}
                </div>
      
            
          </div>
      );

    }


export default UsersPage;

