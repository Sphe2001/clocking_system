"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function Home() {
  const router = useRouter();

  const [user, setUser] = React.useState({
    role: "",
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setButtonDisabled(!(user.email && user.password));
  }, [user]);

  const onLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("/api/login", user);
      toast.success("Login successful");
      if (user.role === "student") {
        router.push("/dashboard");
      } else if (user.role === "supervisor") {
        router.push("/dashboard/supervisor");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-r from-indigo-500 to-purple-600">
      {/* Admin Link */}
      <div className="absolute top-4 right-4 z-10">
        <Link
          href={"/adminlogin"}
          className="p-2 bg-gray-800 text-white rounded-full hover:bg-gray-900 transition-all"
        >
          Admin Login
        </Link>
      </div>

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center relative p-4 sm:p-8 md:p-16 text-center text-white bg-opacity-60">
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
        <div className="relative z-10 max-w-lg w-full space-y-8">
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
            ClockIT
          </h1>
          <p className="text-lg sm:text-xl mb-8">
           On the move!
          </p>

          {/* Login Form */}
          <form
            onSubmit={onLogin}
            className="p-6 bg-white rounded-lg shadow-xl space-y-6"
          >
            <h2 className="text-3xl font-bold text-gray-800 text-center">
              Login
            </h2>

            {/* Role Selection */}
            <div className="mb-6 text-gray-700 flex justify-center gap-6">
              <label className="flex items-center gap-2 transition-transform hover:scale-105">
                <input
                  type="radio"
                  name="role"
                  value="student"
                  checked={user.role === "student"}
                  onChange={(e) => setUser({ ...user, role: e.target.value })}
                  required
                  className="text-indigo-600 focus:ring-indigo-500"
                />
                Student
              </label>
              <label className="flex items-center gap-2 transition-transform hover:scale-105">
                <input
                  type="radio"
                  name="role"
                  value="supervisor"
                  checked={user.role === "supervisor"}
                  onChange={(e) => setUser({ ...user, role: e.target.value })}
                  required
                  className="text-indigo-600 focus:ring-indigo-500"
                />
                Supervisor
              </label>
            </div>

            {/* Email Input */}
            <input
              type="email"
              className="w-full p-3 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              required
            />

            {/* Password Input */}
            <input
              type="password"
              className="w-full p-3 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              required
            />

            {/* Login Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                className={`w-full py-3 rounded-lg text-white font-semibold ${
                  buttonDisabled || loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-700"
                }`}
                disabled={buttonDisabled || loading}
              >
                {loading ? "Logging in..." : buttonDisabled ? "Fill in all fields" : "Login"}
              </button>
            </div>

            {/* Forgot Password Link */}
            <div className="mt-4 text-center">
              <p className="text-gray-700">
                Forgot password?{" "}
                <Link
                  href="/forgotpassword"
                  className="text-indigo-600 hover:underline"
                >
                  Reset here
                </Link>
              </p>
            </div>
          </form>

          {/* Signup Link */}
          <div className="mt-4 text-center">
            <p className="text-gray-700">
              Don't have an account?{" "}
              <Link href="/signup" className="text-indigo-600 hover:underline">
                Sign up here
              </Link>
            </p>
          </div>
        </div>
      </div>

      <Toaster />
    </div>
  );
}
