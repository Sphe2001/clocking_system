"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";

interface User {
  _id: string;
  surname: string;
  initials: string;
  email: string;
  contactNo: string;
}

const UsersPage = () => {
  const [students, setStudents] = useState<User[]>([]);
  const [supervisors, setSupervisors] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const [filteredStudents, setFilteredStudents] = useState<User[]>(students);
  const [filteredSupervisors, setFilteredSupervisors] = useState<User[]>(supervisors);

  // Fetch users on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const studentResponse = await fetch("/api/admin/users/student");
        if (!studentResponse.ok) {
          throw new Error("Failed to fetch students");
        }
        const studentData = await studentResponse.json();
        setStudents(studentData);

        const supervisorResponse = await fetch("/api/admin/users/supervisor");
        if (!supervisorResponse.ok) {
          throw new Error("Failed to fetch supervisors");
        }
        const supervisorData = await supervisorResponse.json();
        setSupervisors(supervisorData);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unknown error occurred.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Filter users based on search term
  useEffect(() => {
    setFilteredStudents(
      students.filter(
        (student) =>
          student.surname.toLowerCase().includes(searchTerm.toLowerCase()) ||
          student.email.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredSupervisors(
      supervisors.filter(
        (supervisor) =>
          supervisor.surname.toLowerCase().includes(searchTerm.toLowerCase()) ||
          supervisor.email.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, students, supervisors]);

  if (loading) return <p>Loading users...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="relative min-h-screen bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-6xl overflow-hidden flex">
        {/* Sidebar */}
        <div className="w-1/4 bg-gray-800 text-white p-6 flex flex-col min-h-full">
          <h2 className="text-2xl font-bold mb-6 text-center">Admin Panel</h2>
          <ul className="space-y-4 text-center">
            <li>
              <Link href="/dashboard/admin" className="block text-lg hover:text-gray-400">Home</Link>
            </li>
            <li>
              <Link href="/dashboard/admin/reports" className="block text-lg hover:text-gray-400">Reports</Link>
            </li>
            <li>
              <Link href="/dashboard/admin/profile" className="block text-lg hover:text-gray-400">Profile</Link>
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="w-3/4 p-6">
          <h1 className="text-2xl font-bold text-center text-black mb-6">All User Records</h1>
          
          {/* Search Bar */}
          <div className="mb-6 text-center">
            <input
              type="text"
              placeholder="Search by username or email"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="p-2 border rounded-lg w-1/2"
            />
          </div>

          {/* Student Records */}
          <h2 className="text-xl font-semibold text-black mb-4">All Students</h2>
          {filteredStudents.length > 0 ? (
            <table className="w-full border-collapse shadow-md rounded-lg overflow-hidden">
              <thead className="bg-gray-700 text-white">
                <tr>
                  <th className="p-4 text-left">Surname</th>
                  <th>Initials</th>
                  <th>Email</th>
                  <th>Contact N0:</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student) => (
                  <tr key={student._id} className="border-b text-center">
                    <td className="p-4 text-black">{student.surname}</td>
                    <td>{student.initials}</td>
                    <td>{student.email}</td>
                    <td>{student.contactNo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-500">No students found.</p>
          )}

          {/* Supervisor Records */}
          <h2 className="text-xl font-semibold text-black mt-6 mb-4">All Supervisors</h2>
          {filteredSupervisors.length > 0 ? (
            <table className="w-full border-collapse shadow-md rounded-lg overflow-hidden">
              <thead className="bg-gray-700 text-white">
                <tr>
                  <th className="p-4 text-left">Surname</th>
                  <th>Initials</th>
                  <th>Email</th>
                  <th>Contact No:</th>
                </tr>
              </thead>
              <tbody>
                {filteredSupervisors.map((supervisor) => (
                  <tr key={supervisor._id} className="border-b text-center">
                    <td className="p-4 text-black">{supervisor.surname}</td>
                    <td>{supervisor.initials}</td>
                    <td>{supervisor.email}</td>
                    <td>{supervisor.contactNo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-500">No supervisors found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UsersPage;


