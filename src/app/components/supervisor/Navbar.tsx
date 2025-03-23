"Use Client"

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";


export default function SupervisorNavbar() {
    const router = useRouter();

    const handleLogout = () => {
        const response = axios.get("/api/logout");
        router.push("/");
      };
  return (
    <div>
        {/* Navbar */}
      <nav className="bg-indigo-800 text-white p-4 shadow-md fixed w-full top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/dashboard/supervisor">
            <h1 className="text-xl font-bold hover:text-indigo-300">Dashboard</h1>
          </Link>

          <div className="flex-1"></div> 

          <div className="flex-1 flex justify-center space-x-6 mr-20">
            <Link href="/dashboard/supervisor/viewStudents" className="hover:text-indigo-300">
              View Students
            </Link>
            <Link href="/dashboard/supervisor/viewProfile" className="hover:text-indigo-300">
              View Profile
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
