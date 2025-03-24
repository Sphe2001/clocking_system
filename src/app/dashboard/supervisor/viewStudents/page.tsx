"use client";

import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import SupervisorNavbar from "@/app/components/supervisor/Navbar";

interface Student {
  username: string;
  surname: string;
  initials: string;
  clock_in?: string;
  clock_out?: string;
  status: string;
}

export default function ViewStudentPage() {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const [students, setStudents] = useState<Student[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null);
  const lastStudentRef = useRef<HTMLTableRowElement | null>(null);
  useEffect(() => {
    // Check if the user is authorized
    const checkAuthorization = async () => {
      try {
        const response = await axios.get("/api/auth/student");
        if (response.data) {
          setIsAuthorized(true);
        } else {
          setIsAuthorized(false);
          router.push("/"); // Redirect to login if unauthorized
        }
      } catch (error) {
        setIsAuthorized(false);
        router.push("/"); // Redirect to login on error
      }
    };

    checkAuthorization();
  }, [router]);
  if (isAuthorized === null) {
    return (
      <p className="text-center text-gray-600 mt-10">
        Checking authorization...
      </p>
    );
  }

  if (!isAuthorized) {
    return null; // Prevents rendering if unauthorized
  }

  useEffect(() => {
    fetchStudents(page);
  }, [page]);

  const fetchStudents = async (page: number) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `/api/supervisor/viewStudents?page=${page}`
      );
      const data = await response.data;
      setStudents((prev) => [...prev, ...data]); // Append new students
    } catch (error) {
      console.error("Error fetching students:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (loading) return;

    observer.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((prev) => prev + 1); // Load next page when scrolling reaches the bottom
        }
      },
      { threshold: 1 }
    );

    if (lastStudentRef.current) {
      observer.current.observe(lastStudentRef.current);
    }

    return () => observer.current?.disconnect();
  }, [loading]);

  return (
    <div
      className="relative min-h-screen bg-gradient-to-br from-indigo-500 to-purple-700"
      style={{
        backgroundImage: `url('/images/15.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <SupervisorNavbar />

      <div className="flex flex-col items-center p-6">
        <h1 className="text-3xl font-bold text-white mb-6">Student List</h1>

        {/* Card Container */}
        <div className="w-full max-w-5xl bg-white shadow-lg rounded-lg p-6">
          <div className="overflow-y-auto max-h-[70vh] scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
            {/* Table */}
            <table className="w-full border-collapse text-left rounded-lg overflow-hidden">
              {/* Table Head */}
              <thead className="bg-indigo-700 text-white sticky top-0">
                <tr>
                  <th className="p-3 border border-gray-300">Username</th>
                  <th className="p-3 border border-gray-300">Surname</th>
                  <th className="p-3 border border-gray-300">Initials</th>
                  <th className="p-3 border border-gray-300">Clock In</th>
                  <th className="p-3 border border-gray-300">Clock Out</th>
                  <th className="p-3 border border-gray-300">Status</th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody>
                {students.map((student, index) => (
                  <tr
                    key={index}
                    ref={index === students.length - 1 ? lastStudentRef : null}
                    className={`border-b ${
                      index % 2 === 0 ? "bg-gray-100" : "bg-gray-50"
                    } hover:bg-indigo-100 transition`}
                  >
                    <td className="p-3 border border-gray-300 text-gray-900">
                      {student.username}
                    </td>
                    <td className="p-3 border border-gray-300 text-gray-900">
                      {student.surname}
                    </td>
                    <td className="p-3 border border-gray-300 text-gray-900">
                      {student.initials}
                    </td>
                    <td className="p-3 border border-gray-300 text-gray-900">
                      {student.clock_in ? student.clock_in : "Not clocked in"}
                    </td>
                    <td className="p-3 border border-gray-300 text-gray-900">
                      {student.clock_out
                        ? student.clock_out
                        : "Not clocked out"}
                    </td>
                    <td
                      className={`p-3 border border-gray-300 font-semibold ${
                        student.status === "Late"
                          ? "text-yellow-600"
                          : student.status === "Absent"
                          ? "text-red-600"
                          : student.status === "Attended"
                          ? "text-green-600"
                          : "text-gray-600"
                      }`}
                    >
                      {student.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Loading Indicator */}
        {loading && (
          <p className="mt-4 text-white text-lg font-semibold animate-pulse">
            Loading more students...
          </p>
        )}
      </div>
    </div>
  );
}
function setIsAuthorized(arg0: boolean) {
  throw new Error("Function not implemented.");
}
