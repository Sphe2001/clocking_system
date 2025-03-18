"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';

export default function SignUpPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
    role: "",
    username: "",
    surname: "",
    initials: "",
    contactNo: ""
  });
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setButtonDisabled(!(user.username && user.email && user.password));
  }, [user]);

  const onSignup = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("/api/signup", user);
      toast.success("Signup successful");

      router.push("/");
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-screen bg-white">
        <form
          onSubmit={onSignup}
          className="p-6 bg-gray-200 rounded-lg w-80 shadow-md"
        >
          <h2 className="text-2xl font-bold mb-4 text-black text-center">
            Sign Up
          </h2>

          <select
            className="p-2 mb-4 w-full border rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={user.role}
            onChange={(e) => setUser({ ...user, role: e.target.value })}
            required
          >
            <option value="">Select Role</option>
            <option value="student">Student</option>
            <option value="supervisor">Supervisor</option>
          </select>

          <input
            type="text"
            className="p-2 mb-2 w-full border rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Student/Staff Number"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            required
          />

          <input
            type="email"
            className="p-2 mb-2 w-full border rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            required
          />
          <input
            type="text"
            className="p-2 mb-2 w-full border rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Surname"
            value={user.surname}
            onChange={(e) => setUser({ ...user, surname: e.target.value })}
            required
          />
          <input
            type="text"
            className="p-2 mb-2 w-full border rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Initial(s)"
            value={user.initials}
            onChange={(e) => setUser({ ...user, initials: e.target.value })}
            required
          />
          <input
            type="text"
            className="p-2 mb-2 w-full border rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Contact Number"
            value={user.contactNo}
            onChange={(e) => setUser({ ...user, contactNo: e.target.value })}
            required
          />
          <input
            type="password"
            className="p-2 mb-4 w-full border rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            required
          />

          <div className="flex justify-center">
            <button
              type="submit"
              className={`p-2 w-full rounded-lg text-white ${
                buttonDisabled || loading
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-black hover:bg-gray-800"
              }`}
              disabled={buttonDisabled || loading}
            >
              {loading
                ? "Signing Up..."
                : buttonDisabled
                ? "Fill in all fields"
                : "Sign Up"}
            </button>
          </div>
        </form>

        <div className="mt-4 text-center">
          <p className="text-black">
            Already have an account?{" "}
            <Link href="/" className="text-blue-600 hover:underline">
              Login here
            </Link>
          </p>
        </div>
        <Toaster />
      </div>
    </div>
  );
}
