'use client';

import axios from "axios";
import Link from "next/link";
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
  const [students, setStudents] = useState<Student[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null);
  const lastStudentRef = useRef<HTMLTableRowElement | null>(null);

  useEffect(() => {
    fetchStudents(page);
  }, [page]);

  const fetchStudents = async (page: number) => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/supervisor/viewStudents?page=${page}`);
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

  const handleLogout = async () => {
    await axios.get("/api/logout");
    router.push("/");
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-r from-indigo-500 to-purple-600">
      <SupervisorNavbar />
        <div className="min-h-screen bg-indigo-900 flex flex-col items-center p-6">
          

          <h1 className="text-2xl font-bold mb-6 text-white">Student List</h1>

          <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-4 overflow-hidden">
            <div className="overflow-y-auto max-h-[70vh] scrollbar-thin scrollbar-thumb-gray-300">
              <table className="w-full border-collapse border border-gray-200 text-left">
                <thead className="bg-indigo-800 text-white">
                  <tr>
                    <th className="p-3 border border-gray-300">Username</th>
                    <th className="p-3 border border-gray-300">Surname</th>
                    <th className="p-3 border border-gray-300">Initials</th>
                    <th className="p-3 border border-gray-300">Clock In</th>
                    <th className="p-3 border border-gray-300">Clock Out</th>
                    <th className="p-3 border border-gray-300">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student, index) => (
                    <tr
                      key={index}
                      ref={index === students.length - 1 ? lastStudentRef : null}
                      className="border-b hover:bg-indigo-100"
                    >
                      <td className="p-3 border border-gray-300 text-black">{student.username}</td>
                      <td className="p-3 border border-gray-300 text-black">{student.surname}</td>
                      <td className="p-3 border border-gray-300 text-black">{student.initials}</td>
                      <td className="p-3 border border-gray-300 text-black">
                        {student.clock_in ? student.clock_in : "Not clocked in"}
                      </td>
                      <td className="p-3 border border-gray-300 text-black">
                        {student.clock_out ? student.clock_out : "Not clocked out"}
                      </td>
                      <td className="p-3 border border-gray-300 text-black">{student.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {loading && <p className="mt-4 text-gray-600">Loading more students...</p>}
        </div>
    </div>
    
  );
}
