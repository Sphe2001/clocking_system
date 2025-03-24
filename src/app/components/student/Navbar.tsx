"Use Client"


import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";

export default function Navbar() {
    const router = useRouter();

    const handleLogout = () => {
        const response = axios.get("/api/logout");
        router.push("/");
      };
  return (
    <div>
        <nav className="bg-indigo-800  text-white p-4 shadow-md fixed w-full top-0 z-50">
            <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-xl font-bold">
                <Link href="/dashboard/student" className="hover:text-gray-300">Dashboard</Link>
                </h1>
                <div className="flex-1"></div> 

                <div className="flex-1 flex justify-center space-x-6 mr-20">
                
                    <Link href="/dashboard/student/viewProfile" className="hover:text-gray-300">
                    View Profile
                    </Link>
                </div>
                <div className="flex-1 flex justify-center space-x-6 mr-20">
                
                <Link href="/dashboard/student/viewAttendanceHistory" className="hover:text-gray-300">
                View My Clocking History
                </Link>
            </div>
                <div className="flex-1 flex justify-end">
                    <button
                    onClick={handleLogout}
                    className="bg-red-600 px-4 py-2 rounded-lg hover:bg-red-800 transition-all"
                    >
                    Logout
                    </button>
                </div>
            </div>
      </nav>
    </div>
  )
}
