"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import Navbar from "@/app/components/student/Navbar";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState({
    username: "",
    email: "",
    surname: "",
    initials: "",
    contactNo: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user);

  // Fetch user profile data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("/api/student/profile/view");
        setUser(response.data);
        setEditedUser(response.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUser();
  }, []);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
  };

  // Enable edit mode
  const handleEdit = () => {
    setIsEditing(true);
  };

  // Save edited data
  const handleSave = async () => {
    try {
      await axios.post("/api/student/profile/edit", editedUser);
      setUser(editedUser);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  // Cancel editing
  const handleCancel = () => {
    setEditedUser(user);
    setIsEditing(false);
  };

  // Delete profile
  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete your profile?")) {
      try {
        await axios.post("/api/student/profile/delete");
        toast.success("Profile deleted successfully!");
        router.push("/");
      } catch (error) {
        console.error("Error deleting profile:", error);
      }
    }
  };
  const handleLogout = async () => {
    await axios.get("/api/logout");
    router.push("/");
  };

  return (
    <div
    className="relative min-h-screen bg-cover bg-center p-6"
    style={{ backgroundImage: `url('/images/1.png')` }} // Add your background image here
  >
      <Navbar />
          <div className="flex justify-center items-center min-h-screen p-6">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
              <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                Student Profile
              </h2>

              <div className="space-y-4">
                {/* Username */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700">Username</label>
                  <input
                    type="text"
                    name="username"
                    value={editedUser.username}
                    onChange={handleChange}
                    disabled={true}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 text-black ${
                      isEditing ? "border-blue-500 focus:ring-blue-400" : "border-gray-300 bg-gray-100"
                    }`}
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={editedUser.email}
                    onChange={handleChange}
                    disabled={true}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 text-black ${
                      isEditing ? "border-blue-500 focus:ring-blue-400" : "border-gray-300 bg-gray-100"
                    }`}
                  />
                </div>

                {/* Surname */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700">Surname</label>
                  <input
                    type="text"
                    name="surname"
                    value={editedUser.surname}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 text-black ${
                      isEditing ? "border-blue-500 focus:ring-blue-400" : "border-gray-300 bg-gray-100"
                    }`}
                  />
                </div>

                {/* Initials */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700">Initials</label>
                  <input
                    type="text"
                    name="initials"
                    value={editedUser.initials}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 text-black ${
                      isEditing ? "border-blue-500 focus:ring-blue-400" : "border-gray-300 bg-gray-100"
                    }`}
                  />
                </div>

                {/* Contact Number */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700">Contact Number</label>
                  <input
                    type="text"
                    name="contactNo"
                    value={editedUser.contactNo}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 text-black ${
                      isEditing ? "border-blue-500 focus:ring-blue-400" : "border-gray-300 bg-gray-100"
                    }`}
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="mt-6 flex justify-between">
                {!isEditing ? (
                  <button
                    onClick={handleEdit}
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all"
                  >
                    Edit Profile
                  </button>
                ) : (
                  <div className="flex space-x-2 w-full">
                    <button
                      onClick={handleSave}
                      className="w-1/2 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-all"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancel}
                      className="w-1/2 bg-gray-400 text-white py-2 rounded-lg hover:bg-gray-500 transition-all"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>

              {/* Delete Button */}
              <div className="mt-4">
                <button
                  onClick={handleDelete}
                  className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-all"
                >
                  Delete Profile
                </button>
              </div>
          </div>
        </div>
    </div>
    
  );
}
