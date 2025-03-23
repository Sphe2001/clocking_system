"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";

export default function Home() {
  const router = useRouter();
  const [user, setUser] = React.useState({
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
      const response = await axios.post("/api/login/admin", user);
      toast.success("Login successful");
      router.push("/dashboard/admin");
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-r from-indigo-500 to-purple-600"
      style={{
        backgroundImage: `url('/images/15.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center relative p-4 sm:p-8 md:p-16 text-center text-white bg-opacity-60">
        
        <div className="relative z-10 max-w-lg w-full space-y-8">
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight text-black">
            Admin Login
          </h1>
          <p className="text-lg sm:text-xl mb-8 text-black">
            Please enter your credentials to access the admin dashboard.
          </p>

          {/* Login Form */}
          <form
            onSubmit={onLogin}
            className="p-6 bg-white rounded-lg shadow-xl space-y-6"
          >
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
                {loading
                  ? "Logging in..."
                  : buttonDisabled
                  ? "Fill in all fields"
                  : "Login"}
              </button>
            </div>
            <div className="mt-4 text-center">
              <p className="text-black">
                Forgot password?{" "}
                <Link href="/forgotpassword/admin" className="text-blue-600 hover:underline">
                  Reset here
                </Link>
              </p>
            </div>
          </form>

          
          
        </div>
      </div>

      <Toaster />
    </div>
  );
}
