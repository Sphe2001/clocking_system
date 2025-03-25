"use client";

import React, { useState } from "react";
import axios from "axios";
import Navbar from "@/app/components/student/Navbar";
import toast, { Toaster } from 'react-hot-toast';
import { UserIcon, UsersIcon,TableCellsIcon } from "@heroicons/react/16/solid";
import SupervisorNavbar from "@/app/components/supervisor/Navbar";



export default function DashboardPage() {

  const [attendanceTime, setAttendanceTime] = useState<string | null>(null);
  const [endSessionTime, setEndSessionTime] = useState<string | null>(null);
  const [showTodoList, setShowTodoList] = useState(false);
  const [todoList, setTodoList] = useState<string[]>([]);


  const handleSignAttendance = async () => {
     
    try {
      const response = await axios.post("/api/clocking/student/clocking_in");
      if (response.data.success) {
        const timestamp = new Date().toLocaleString();
        setAttendanceTime(timestamp);
        toast.success("Clock-in successful");
      } else {
        toast.error("Clock-in failed");
      }
    } catch (error) {
      toast.error("Error while clocking in");
    }
  };

  const handleEndSession = async () => {
    
    try {
      const response = await axios.post("/api/clocking/student/clocking_out");
      if (response.data.success) {
        const timestamp = new Date().toLocaleString();
        setEndSessionTime(timestamp);
        toast.success("Clock-out successful");
      } else {
        toast.error("Clock-out failed");
      }
    } catch (error) {
      toast.error("Error while clocking out");
    }
  };

  const handleFetchTodoList = async () => {
    try {
      const response = await axios.get("/api/todo");
      setTodoList(response.data.todos || []);
      setShowTodoList(!showTodoList);
    } catch (error) {
      toast.error("Error fetching to-do list");
    }
  };


  /*const handleFetchAssignedTasks = async () => {
    try {
      const response = await axios.get(`/api/tasks?assignedTo=${studentUsername}`);
      setTaskList(response.data);
    } catch (error:any) {
      toast.error("Error fetching tasks");
    }
  };
  
  const handleMarkTaskAsDone = async (taskId: string) => {
    try {
      const response = await axios.post("/api/tasks/status", { taskId, status: "Completed" });
      if (response.data.success) {
        toast.success("Task marked as completed");
        handleFetchAssignedTasks(); // Refresh tasks
      }
    } catch (error:any) {
      toast.error("Error marking task as completed");
    }
  };
  
  {taskList.map((task: { status: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | Promise<React.AwaitedReactNode> | null | undefined; _id: string; task: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; }, index: React.Key | null | undefined) => (
    <li key={index} className="flex items-center space-x-2">
      <input
        type="checkbox"
        checked={task.status === "Completed"}
        onChange={() => handleMarkTaskAsDone(task._id)}
      />
      <span>{task.task}</span>
      <span>{task.status}</span>
    </li>
  ))}*/
  



  return (
    <div

      className="relative min-h-screen bg-center "
      style={{
        backgroundImage: `url('/images/15.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Navbar />
      
      <div className="flex flex-col items-center justify-center min-h-screen relative text-white px-6 sm:px-8 md:px-12">
        
     
        <div className="relative z-10 max-w-lg w-full text-center space-y-6 p-8 bg-gradient-to-b from-blue-300 to-white bg-opacity-10 backdrop-blur-md rounded-lg shadow-lg">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-black">Welcome, Student!</h1>
          <p className="text-lg sm:text-xl text-black">Click below to sign your attendance or end the session.</p>


          <button
            onClick={handleSignAttendance}
            className="w-full max-w-xs p-3 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-800 transition-all"
          >
            Sign Attendance
          </button>

          <button
            onClick={handleEndSession}
            className={`w-full max-w-xs p-3 text-lg font-bold text-white rounded-lg transition-all ${
              attendanceTime
                ? "bg-red-600 hover:bg-red-800"
                : "bg-blue-500 cursor-not-allowed opacity-50"
            }`}
            disabled={!attendanceTime}
          >
            End Session
          </button>

          <button
            onClick={handleFetchTodoList}
            className="w-full max-w-xs p-3 bg-blue-400 text-white text-lg font-semibold rounded-lg hover:bg-green-800 transition-all"
          >
            {showTodoList ? "Hide To-Do List" : "Show To-Do List"}
          </button>

          {showTodoList && (
            <ul className="mt-4 text-black bg-white bg-opacity-20 p-4 rounded-lg">
              {todoList.length > 0 ? (
                todoList.map((todo, index) => <li key={index} className="text-lg">• {todo}</li>)
              ) : (
                <p className="text-lg">No tasks available</p>
              )}
            </ul>
          )}


  
          <div className="mt-4 text-white">
            {attendanceTime && <p className="text-lg">You signed in at: {attendanceTime}</p>}
            {endSessionTime && <p className="text-lg">You signed out at: {endSessionTime}</p>}

          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
}
function setTaskList(data: any) {
  throw new Error("Function not implemented.");
}

