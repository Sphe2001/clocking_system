'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from "axios";


const ProfilePage = () => {
      const router = useRouter();
      const [admin, setAdmin] = useState<{ username: string; email: string } | null>(null);

      useEffect(() => {
          const fetchAdmin = async () => {
              try {
                  const response = await axios.get("/api/admin/profile/view");
                  setAdmin(response.data);
              } catch (error) {
                  console.error("Error fetching admin details", error);
              }
          };
          fetchAdmin();
      }, []);

      const handleNavigation = (path: string) => {
          router.push(path);
      };

      const handleLogout = async () => {
          await axios.get("/api/logout");
          router.push("/adminlogin");
      };

      const handleDeleteAccount = async () => {
          try {
              await axios.post("/api/admin/profile/delete");
              router.push("/adminlogin");
          } catch (error) {
              console.error("Error deleting admin account", error);
          }
      };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-1/4 bg-blue-700 text-white p-5">
        <h1 className="text-2xl font-bold mb-8">ADMIN PANEL</h1>
        <nav className="space-y-4">
          <div className="p-2 cursor-pointer hover:bg-blue-500 rounded" onClick={() => handleNavigation("/dashboard/admin")}>Dashboard</div>
          <div className="p-2 cursor-pointer hover:bg-blue-500 rounded" onClick={() => handleNavigation("/dashboard/admin/users")}>Users</div>
          <div className="p-2 cursor-pointer hover:bg-blue-500 rounded" onClick={() => handleNavigation("/dashboard/admin/reports")}>Reports</div>
          <div className="p-2 cursor-pointer hover:bg-blue-500 rounded" onClick={() => handleNavigation("/dashboard/admin/profile")}>Profile</div>
          <div className="p-2 cursor-pointer hover:bg-red-500 rounded" onClick={handleLogout}>Logout</div>
        </nav>
      </aside>

      {/* Profile Content */}
      <main className="w-3/4 p-10 bg-white shadow-md rounded-lg mx-auto my-10 max-w-2xl">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Admin Profile</h2>
        {admin ? (
          <div className="bg-white p-6 border border-gray-300 rounded-lg shadow-sm">
            <p className="text-xl mb-2 text-gray-700"><strong>Staff Number: </strong> {admin.username}</p>
            <p className="text-xl mb-4 text-gray-700"><strong>Email: </strong> {admin.email}</p>
            <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-200" onClick={handleDeleteAccount}>Delete Account</button>
          </div>
        ) : (
          <p className="text-gray-500">Loading profile...</p>
        )}
      </main>
    </div>
  );
};

export default ProfilePage;