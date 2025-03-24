"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

const ReportsPage = () => {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [attendance, setAttendance] = useState<any>(null);
  const [supervisors, setSupervisors] = useState<any>(null);
  const [currentStudentPage, setCurrentStudentPage] = useState(1);
  const [currentSupervisorPage, setCurrentSupervisorPage] = useState(1);
  const recordsPerPage = 20;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [studentsRes, supervisorsRes] = await Promise.all([
          axios.get("/api/attendance/students"),
          axios.get("/api/attendance/supervisors"),
        ]);
        setAttendance(studentsRes.data);
        console.log(studentsRes.data);
        setSupervisors(supervisorsRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    const checkAuth = async () => {
      try {
        const response = await axios.get("/api/auth/admin");
        if (response.data) {
          setIsAuthorized(true);
          fetchUsers();
          fetchData();
        } else {
          toast.error("Access Denied");
          router.push("/adminlogin");
        }
      } catch (error) {
        console.error("Authentication check failed:", error);
        router.push("/adminlogin");
      }
    };

    checkAuth();

    fetchData();
  }, []);
  // Fetch user data after authentication
  const fetchUsers = () => {
    axios
      .get("/api/admin/users/student")
      .then((response) => setStudents(response.data))
      .catch((error) => console.error("Error fetching students:", error));

    axios
      .get("/api/admin/users/supervisor")
      .then((response) => setSupervisors(response.data))
      .catch((error) => console.error("Error fetching supervisors:", error));
  };

  if (!isAuthorized) {
    return (
      <div className="text-center text-gray-700 p-5">
        Checking Authorization...
      </div>
    );
  }

  const handleLogout = async () => {
    await axios.get("/api/logout");
    router.push("/adminlogin");
  };

  const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  if (!attendance || !supervisors) {
    return (
      <p className="text-center text-gray-600 mt-10">Loading reports...</p>
    );
  }

  const users = Object.keys(attendance);
  const supervisorUsers = Object.keys(supervisors);
  const totalStudentPages = Math.ceil(users.length / recordsPerPage);
  const totalSupervisorPages = Math.ceil(
    supervisorUsers.length / recordsPerPage
  );

  const studentStartIndex = (currentStudentPage - 1) * recordsPerPage;
  const selectedUsers = users.slice(
    studentStartIndex,
    studentStartIndex + recordsPerPage
  );

  const supervisorStartIndex = (currentSupervisorPage - 1) * recordsPerPage;
  const selectedSupervisors = supervisorUsers.slice(
    supervisorStartIndex,
    supervisorStartIndex + recordsPerPage
  );

  const handleNavigation = (path: string) => {
    router.push(path);
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
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">
          Week Attendance Records
        </h2>

        {/* Students Table */}
        <div className="overflow-y-auto max-h-[70vh] border border-gray-300 rounded-lg shadow-md mb-6">
          <table className="table-auto w-full border-collapse text-sm">
            <thead className="bg-gray-200 sticky top-0">
              <tr>
                <th className="border px-4 py-2 text-left text-black">Name</th>
                <th className="border px-4 py-2 text-left text-black">Role</th>
                {weekdays.map((day) => (
                  <th
                    key={day}
                    className="border px-4 py-2 text-center text-black"
                  >
                    {day}
                  </th>
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
                    {Object.values(user.attendance).map(
                      (record: any, index) => (
                        <td
                          key={index}
                          className="border px-4 py-2 text-center"
                        >
                          <span className="text-gray-800">{record.date}</span> -
                          <span className="text-blue-600 font-semibold">
                            {" "}
                            {record.dayOfWeek}
                          </span>{" "}
                          -
                          <span
                            className={
                              record.status === "Attended"
                                ? "text-green-600 font-semibold"
                                : record.status === "Absent"
                                ? "text-red-600 font-semibold"
                                : "text-yellow-600 font-semibold"
                            }
                          >
                            {record.status}
                          </span>
                        </td>
                      )
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Supervisors Table */}
        <div className="overflow-y-auto max-h-[70vh] border border-gray-300 rounded-lg shadow-md">
          <table className="table-auto w-full border-collapse text-sm">
            <thead className="bg-gray-200 sticky top-0">
              <tr>
                <th className="border px-4 py-2 text-left text-black">Name</th>
                <th className="border px-4 py-2 text-left text-black">Role</th>
                {weekdays.map((day) => (
                  <th
                    key={day}
                    className="border px-4 py-2 text-center text-black"
                  >
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y">
              {selectedSupervisors.map((email) => {
                const supervisor = supervisors[email];
                return (
                  <tr key={email} className="hover:bg-gray-100">
                    <td className="border px-4 py-2 text-black">
                      {supervisor.name}
                    </td>
                    <td className="border px-4 py-2 text-black">
                      {supervisor.role}
                    </td>
                    {Object.values(supervisor.attendance).map(
                      (record: any, index) => (
                        <td
                          key={index}
                          className="border px-4 py-2 text-center"
                        >
                          <span className="text-gray-800">{record.date}</span> -
                          <span className="text-blue-600 font-semibold">
                            {" "}
                            {record.dayOfWeek}
                          </span>{" "}
                          -
                          <span
                            className={
                              record.status === "Attended"
                                ? "text-green-600 font-semibold"
                                : record.status === "Absent"
                                ? "text-red-600 font-semibold"
                                : "text-yellow-600 font-semibold"
                            }
                          >
                            {record.status}
                          </span>
                        </td>
                      )
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;
function setStudents(data: any): any {
  throw new Error("Function not implemented.");
}

