"use client";

import { useRouter } from "next/navigation";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { UserIcon, UsersIcon,TableCellsIcon } from "@heroicons/react/16/solid";
import Link from "next/link";
//Importing Charts
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

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
  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042"];

  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);
  const [filteredRecords, setFilteredRecords] = useState<AttendanceRecord[]>([]);
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
      const totalStudentsResponse = await fetch("/api/admin/summary/numOfStudents");
      const totalSupervisorsResponse = await fetch("/api/admin/summary/numOfSupervisors");

      const totalStudents = await totalStudentsResponse.json();
      const totalSupervisors = await totalSupervisorsResponse.json();

      const studentsAttendedResponse = await fetch("/api/admin/summary/studentsAttended");
      const supervisorsAttendedResponse = await fetch("/api/admin/summary/supervisorsAttended");

      const studentsAttended = await studentsAttendedResponse.json();
      const supervisorsAttended = await supervisorsAttendedResponse.json();

      setSummaryData([
        { title: "Total Num Of Students", value: totalStudents.studentCount },
        { title: "Total Num Of Supervisors", value: totalSupervisors.supervisorCount },
        { title: "Students Attended", value: studentsAttended.studentAttCount },
        { title: "Supervisors Attended", value: supervisorsAttended.supervisorAttCount },
      ]);
    } catch (error) {
      console.error("Error fetching summary data:", error);
    }
  };
  const totalData = [
    { name: "Students", value: summaryData[0].value },
    { name: "Supervisors", value: summaryData[1].value },
  ];
  const attendanceData = [
    { name: "Students Attended", value: summaryData[2].value },
    { name: "Supervisors Attended", value: summaryData[3].value },
  ];

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedRole = event.target.value;
    setRoleFilter(selectedRole);

    if (selectedRole === "All") {
      setFilteredRecords(attendanceRecords);
    } else {
      setFilteredRecords(attendanceRecords.filter((record) => record.role === selectedRole));
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
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-1/4 bg-gradient-to-b from-blue-800 to-indigo-800 text-white p-6">
        <h1 className="text-3xl  mb-10 text-black font-extrabold">Admin Panel</h1>
        <nav className="space-y-5">
          <div
            className="p-3 cursor-pointer hover:bg-blue-500 rounded-xl transition-all duration-300"
            onClick={() => handleNavigation("/dashboard/admin")}
          >
            Dashboard
          </div>
          <div
            className="flex p-3 cursor-pointer hover:bg-blue-500 rounded-xl transition-all duration-300"
            onClick={() => handleNavigation("/dashboard/admin/users")}
          >
            <div className="flex justify-left pr-5">
            <UsersIcon className="size-6 text-red-500" />
            </div>
            Users
          </div>
          <div
            
            className="flex p-3 cursor-pointer hover:bg-blue-500 justify-right rounded-xl transition-all duration-300"
            onClick={() => handleNavigation("/dashboard/admin/reports")}
          >
          <div className="flex justify-left pr-5">
          <TableCellsIcon className="size-6 text-red-500" />
          </div>
            Reports
          </div>
          
          <div
            className=" flex p-3 cursor-pointer hover:bg-blue-500 rounded-xl transition-all duration-300"
            onClick={() => handleNavigation("/dashboard/admin/profile")}
          >
            <div className="flex justify-left pr-5">
            <UserIcon className="size-6 text-red-500" />
            </div>
            Profile
          </div>
          <div
            className="p-3 cursor-pointer hover:bg-red-500 rounded-xl transition-all duration-300"
            onClick={handleLogout}
          >
            Logout
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 bg-white rounded-l-3xl shadow-xl">
        <h2 className="text-4xl font-extrabold text-gray-800">ClockIt</h2>
        <h2 className="text-3xl font-semibold text-gray-800 mb-8">Admin Dashboard</h2>

        {/* Summary Cards */}

        {/* Pie Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
          {/* Total Numbers Pie Chart */}
          <div className="bg-gray-100 p-4 rounded-lg shadow-md border border-gray-300">
            <h3 className="text-lg font-semibold text-center mb-4">
              Total Students vs Supervisors
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={totalData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label
                >
                  {totalData.map((entry, index) => (
                    <Cell
                      key={`cell-total-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Attendance Bar Chart */}
          <div className="bg-gray-100 p-4 rounded-lg shadow-md border border-gray-300">
            <h3 className="text-lg font-semibold text-center mb-4">
              Attendance: Students vs Supervisors
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={attendanceData}
                margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>

        </div>

        {/* Filter Dropdown */}
        <div className="mb-6 flex items-center">
          <label className="mr-4 font-medium text-gray-600">Filter by Role:</label>
          <select
            className="border border-gray-300 p-3 rounded-lg bg-white shadow-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={roleFilter}
            onChange={handleFilterChange}
          >
            <option value="All">All</option>
            <option value="student">Students</option>
            <option value="supervisor">Supervisors</option>
          </select>
        </div>

        {/* Attendance Table */}
        <div className="overflow-x-auto shadow-lg rounded-xl bg-white">
          <table className="w-full table-auto border-collapse border border-gray-300">
            <thead className="bg-blue-100">
              <tr className="text-sm text-gray-700">
                <th className="p-4 border-b">Username</th>
                <th className="p-4 border-b">Surname</th>
                <th className="p-4 border-b">Initials</th>
                <th className="p-4 border-b">Role</th>
                <th className="p-4 border-b">Clock In</th>
                <th className="p-4 border-b">Clock Out</th>
                <th className="p-4 border-b">Status</th>
                <th className="p-4 border-b">Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords.length > 0 ? (
                filteredRecords.map((record, index) => (
                  <tr key={index} className="hover:bg-gray-50 text-center">
                    <td className="p-4 border-b">{record.username}</td>
                    <td className="p-4 border-b">{record.surname}</td>
                    <td className="p-4 border-b">{record.initials}</td>
                    <td className="p-4 border-b">{record.role}</td>
                    <td className="p-4 border-b">{record.clock_in || "N/A"}</td>
                    <td className="p-4 border-b">{record.clock_out || "N/A"}</td>
                    <td
                      className={`p-4 border-b font-semibold ${
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
                    <td className="p-4 border-b">{record.date}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="p-6 text-center text-gray-500">
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
