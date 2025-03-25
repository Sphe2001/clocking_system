
"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import SupervisorNavbar from "@/app/components/supervisor/Navbar";
import toast, { Toaster } from "react-hot-toast";
interface Student {
  _id: string;
  name: string;
}

export default function DashboardPage() {
  const [students, setStudents] = useState<Student[]>([]);

  const [selectedStudents, setSelectedStudents] = useState<Array<string>>([]);
  const [task, setTask] = useState("");

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get("/api/student");
        console.log("Fetched students:", response.data.students); // Debugging line
        setStudents(response.data.students);
      } catch (error) {
        toast.error("Error fetching students");
      }
    };
    fetchStudents();
  }, []);
  
  

  const handleSelectStudent = (studentId: string) => {
    setSelectedStudents((prev: string[]) =>
      prev.includes(studentId)
        ? prev.filter((id) => id !== studentId)
        : [...prev, studentId]
    );
  };

  const handleAssignTask = async () => {
    if (!task.trim()) {
      toast.error("Task cannot be empty");
      return;
    }
    if (selectedStudents.length === 0) {
      toast.error("Please select at least one student");
      return;
    }

    try {
      const response = await axios.post("/api/tasks/assign", {
        task,
        studentIds: selectedStudents,
      });
      if (response.data.success) {
        setTask("");
        setSelectedStudents([]);
        toast.success("Task assigned successfully");
      }
    } catch (error) {
      toast.error("Error assigning task");
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-r from-indigo-500 to-purple-600">
      <SupervisorNavbar />
      <div className="flex flex-col items-center justify-center min-h-screen text-white px-6 sm:px-8 md:px-12">
        <div className="relative z-10 max-w-lg w-full text-center space-y-6 p-8 bg-white bg-opacity-10 backdrop-blur-md rounded-lg shadow-lg">
          <p className="text-lg sm:text-xl text-black">Assign tasks to students</p>

          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="p-2 rounded text-black w-full"
            placeholder="Enter a task"
          />
          <button
            onClick={handleAssignTask}
            className="mt-2 w-full p-3 bg-green-600 text-white text-lg font-semibold rounded-lg hover:bg-green-800 transition-all"
          >
            Assign Task
          </button>

          <div className="mt-4 text-black bg-white bg-opacity-20 p-4 rounded-lg">
            <h2 className="text-lg font-semibold">Select Students</h2>
            <ul>
              {students.map((student) => (
                <li key={student._id} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedStudents.includes(student._id)}
                    onChange={() => handleSelectStudent(student._id)}
                  />
                  {student.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
}
