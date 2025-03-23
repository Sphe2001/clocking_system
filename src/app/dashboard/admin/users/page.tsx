'use client';
import Link from 'next/link';
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import axios from "axios";

const UsersPage = () => {
  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  const handleLogout = async () => {
    await axios.get("/api/logout");
    router.push("/adminlogin");
  };

  const [students, setStudents] = useState<any[]>([]);
  const [supervisors, setSupervisors] = useState<any[]>([]);

  useEffect(() => {
    // Fetch students and supervisors
    axios.get("/api/admin/users/student")
      .then(response => setStudents(response.data))
      .catch(error => console.error("Error fetching students:", error));

    axios.get("/api/admin/users/supervisor")
      .then(response => setSupervisors(response.data))
      .catch(error => console.error("Error fetching supervisors:", error));
  }, []);

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
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">Users List</h2>

        <div className="grid grid-cols-2 gap-4">
          {/* Students Table */}
          <div className="overflow-y-auto max-h-[70vh] border border-gray-300 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 text-center mb-2">Students</h3>
            <table className="table-auto w-full border-collapse text-sm">
              <thead className="bg-gray-200 sticky top-0">
                <tr>
                  <th className="border px-4 py-2 text-left text-black">Name</th>
                  <th className="border px-4 py-2 text-left text-black">StudentNo</th>
                  <th className="border px-4 py-2 text-left text-black">Email</th>
                  
                  <th className="border px-4 py-2 text-left text-black">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y">
                {students.map((student) => (
                  <tr key={student.email} className="hover:bg-gray-100 text-black">
                    <td className="border px-4 py-2 text-black">{student.name}</td>
                    <td className="border px-4 py-2 text-black">{student.username}</td>
                    <td className="border px-4 py-2 text-black">{student.email}</td>
                    
                    <td className="border px-4 py-2 text-black">{student.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Supervisors Table */}
          <div className="overflow-y-auto max-h-[70vh] border border-gray-300 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 text-center mb-2">Supervisors</h3>
            <table className="table-auto w-full border-collapse text-sm">
              <thead className="bg-gray-200 sticky top-0">
                <tr>
                  <th className="border px-4 py-2 text-left text-black">Name</th>
                  <th className="border px-4 py-2 text-left text-black">StaffNo</th>
                  <th className="border px-4 py-2 text-left text-black">Email</th>
                  
                  <th className="border px-4 py-2 text-left text-black">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y">
                {supervisors.map((supervisor) => (
                  <tr key={supervisor.email} className="hover:bg-gray-100">
                    <td className="border px-4 py-2 text-black">{supervisor.name}</td>
                    <td className="border px-4 py-2 text-black">{supervisor.username}</td>
                    <td className="border px-4 py-2 text-black">{supervisor.email}</td>
                    
                    <td className="border px-4 py-2 text-black">{supervisor.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersPage;
