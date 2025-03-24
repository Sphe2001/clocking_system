"use client";

import { useRouter } from "next/navigation";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Link from "next/link";

interface AttendanceRecord {
  username: string;
  surname: string;
  initials: string;
  role: string;
  clock_in: string | null;
  clock_out: string | null;
  status: string;
  date: string;
}

export default function AdminDashboardPage() {
  const router = useRouter();

  const [attendanceRecords, setAttendanceRecords] = useState<
    AttendanceRecord[]
  >([]);
  const [filteredRecords, setFilteredRecords] = useState<AttendanceRecord[]>(
    []
  );
  const [roleFilter, setRoleFilter] = useState("All");

  const [summaryData, setSummaryData] = useState([
    { title: "Total Num Of Students", value: 0 },
    { title: "Total Num Of Supervisors", value: 0 },
    { title: "Students Attended", value: 0 },
    { title: "Supervisors Attended", value: 0 },
  ]);

  useEffect(() => {
    const checkAdminAuth = async () => {
      try {
        const res = await fetch("/api/auth/admin");
        if (res.status !== 200) {
          router.push("/adminlogin"); // Redirect to admin login if not authorized
        }
      } catch (error) {
        console.error("Admin auth check failed:", error);
        router.push("/adminlogin"); // Redirect if error occurs
      }
    };

    checkAdminAuth(); // Perform the check
    fetchAttendance();
    fetchSummaryData();
  }, []);
  

  const fetchAttendance = async () => {
    try {
      const response = await fetch("/api/admin/users");
      const data = await response.json();
      setAttendanceRecords(data);
      setFilteredRecords(data);
    } catch (error) {
      console.error("Error fetching attendance:", error);
    }
  };

  const fetchSummaryData = async () => {
    try {
      // Fetch total number of students and supervisors
      const totalStudentsResponse = await fetch(
        "/api/admin/summary/numOfStudents"
      );
      const totalSupervisorsResponse = await fetch(
        "/api/admin/summary/numOfSupervisors"
      );

      const totalStudents = await totalStudentsResponse.json();
      const totalSupervisors = await totalSupervisorsResponse.json();

      // Fetch students and supervisors who attended today
      const studentsAttendedResponse = await fetch(
        "/api/admin/summary/studentsAttended"
      );
      const supervisorsAttendedResponse = await fetch(
        "/api/admin/summary/supervisorsAttended"
      );

      const studentsAttended = await studentsAttendedResponse.json();
      const supervisorsAttended = await supervisorsAttendedResponse.json();

      setSummaryData([
        { title: "Total Num Of Students", value: totalStudents.studentCount },
        {
          title: "Total Num Of Supervisors",
          value: totalSupervisors.supervisorCount,
        },
        { title: "Students Attended", value: studentsAttended.studentAttCount },
        {
          title: "Supervisors Attended",
          value: supervisorsAttended.supervisorAttCount,
        },
      ]);
    } catch (error) {
      console.error("Error fetching summary data:", error);
    }
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedRole = event.target.value;
    setRoleFilter(selectedRole);

    if (selectedRole === "All") {
      setFilteredRecords(attendanceRecords);
    } else {
      setFilteredRecords(
        attendanceRecords.filter((record) => record.role === selectedRole)
      );
    }
  };

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  const handleLogout = async () => {
    await axios.get("/api/logout");
    router.push("/adminlogin");
  };

  return (
    <div className="flex h-screen bg-gray-100">
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
      <main className="flex-1 bg-white text-black p-6 shadow-md">
        <h2 className="text-2xl font-bold mb-6">CLOCKIT-ADMIN DASHBOARD</h2>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {summaryData.map(({ title, value }) => (
            <div
              key={title}
              className="bg-gray-100 text-black p-4 rounded-lg shadow-md text-center border border-gray-300"
            >
              <h3 className="text-lg font-semibold">{title}</h3>
              <p className="text-2xl font-bold">{value}</p>
            </div>
          ))}
        </div>

        {/* Filter Dropdown */}
        <div className="mb-4">
          <label className="mr-2 font-semibold">Filter by Role:</label>
          <select
            className="border border-gray-300 p-2 rounded-md text-black bg-white shadow-sm"
            value={roleFilter}
            onChange={handleFilterChange}
          >
            <option value="All">All</option>
            <option value="student">Students</option>
            <option value="supervisor">Supervisors</option>
          </select>
        </div>

        {/* Attendance Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 bg-white shadow-md">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 p-2 text-black">
                  Username
                </th>
                <th className="border border-gray-300 p-2 text-black">
                  Surname
                </th>
                <th className="border border-gray-300 p-2 text-black">
                  Initials
                </th>
                <th className="border border-gray-300 p-2 text-black">Role</th>
                <th className="border border-gray-300 p-2 text-black">
                  Clock In
                </th>
                <th className="border border-gray-300 p-2 text-black">
                  Clock Out
                </th>
                <th className="border border-gray-300 p-2 text-black">
                  Status
                </th>
                <th className="border border-gray-300 p-2 text-black">Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords.length > 0 ? (
                filteredRecords.map((record, index) => (
                  <tr key={index} className="text-center hover:bg-gray-100">
                    <td className="border border-gray-300 p-2">
                      {record.username}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {record.surname}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {record.initials}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {record.role}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {record.clock_in || "N/A"}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {record.clock_out || "N/A"}
                    </td>
                    <td
                      className={`border border-gray-300 p-2 font-semibold ${
                        record.status === "Late"
                          ? "text-yellow-600"
                          : record.status === "Absent"
                          ? "text-red-600"
                          : record.status === "Attended"
                          ? "text-green-600"
                          : "text-gray-600"
                      }`}
                    >
                      {record.status}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {record.date}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="text-center p-4 text-gray-500">
                    No attendance records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
