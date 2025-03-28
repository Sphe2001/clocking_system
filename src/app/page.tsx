"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
//import loginBackground from '/images/backgroundTemplate.png';  // Import the image
export default function Home() {
  const router = useRouter();

  const [user, setUser] = useState({
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
      await axios.post("/api/login", user);
      toast.success("Login successful");

      if (user.role === "student") {
        router.push("/dashboard/student");
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-6"
        style={{ 
          backgroundImage: `url('/images/2.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
         }}
    >
      {/* Admin Link */}
      <div className="absolute top-4 right-4">
        <Link

          href="/adminlogin"
          className="p-2 bg-black text-white rounded-full hover:bg-red-900 transition-all"
        >
          Admin Login
        </Link>
      </div>


      {/* Logo Centered */}
      <img
        alt="TUT Logo"
        src="https://www.accord.org.za/wp-content/uploads/2016/09/TUT-Logo1.jpg"
        className="h-20 w-20 mb-10  rounded-full"
      />

      {/* Header */}
      <h1 className="text-4xl font-extrabold text-gray-800">ClockIT</h1>

      {/* Login Form */}
      <form
        onSubmit={onLogin}
        className="mt-6 w-full max-w-md p-6 bg-gradient-to-b from-blue-100 to-indigo-500  border border-gray-300 rounded-lg shadow-lg"
      >
        <h2 className="text-2xl  font-bold text-center text-gray-800">Login</h2>

        {/* Role Selection */}
        <div className="mt-4 flex justify-center space-x-6">
          <label className="flex items-center gap-2 text-black">

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
          <label className="flex items-center gap-2 text-black">
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
          className="mt-4 w-full p-3 bg-white border rounded-lg text-gray-700 focus:ring-2 focus:ring-indigo-500"
          placeholder="Email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          required
        />

        {/* Password Input */}
        <input
          type="password"
          className="mt-4 w-full p-3 border white rounded-lg text-gray-700 focus:ring-2 focus:ring-indigo-500"
          placeholder="Password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          required
        />

        {/* Login Button */}
        <button
          type="submit"
          className={`mt-6 w-full py-3 rounded-lg text-white font-semibold ${
            buttonDisabled || loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700"
          }`}
          disabled={buttonDisabled || loading}
        >
          {loading ? "Logging in..." : buttonDisabled ? "Fill in all fields" : "Login"}
        </button>

        {/* Forgot Password Link */}
        <div className="mt-4 text-center text-gray-700">
          <p>
            Forgot password?{" "}
            <span
              onClick={(e) => {
                if (!user.role) {
                  e.preventDefault();
                  toast.error("Please select the user type");
                } else {
                  router.push(`/forgotpassword/${user.role}`);
                }
              }}
              className="text-indigo-600 hover:underline cursor-pointer"
            >
              Reset here
            </span>
          </p>

        </div>
      </form>

      {/* Signup Link */}
      <div className="mt-4 text-center text-gray-800">
        <p>
          Don't have an account?{" "}
          <Link href="/signup" className="text-indigo-600 hover:underline">
            Sign up here
          </Link>
        </p>
      </div>

      <Toaster />
    </div>
  );
}

