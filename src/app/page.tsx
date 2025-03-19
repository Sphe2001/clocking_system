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
    <div>
      <div className="flex flex-col items-center justify-center min-h-screen bg-white">
        <form
          onSubmit={onLogin}
          className="p-6 bg-gray-200 rounded-lg w-80 shadow-md"
        >
          <h2 className="text-2xl font-bold mb-4 text-black text-center">
            Login
          </h2>

          <div className="mb-4 text-black flex justify-center gap-4">
            <label className="flex items-center gap-2 transition-transform hover:scale-105">
              <input
                type="radio"
                name="role"
                value="student"
                checked={user.role === "student"}
                onChange={(e) => setUser({ ...user, role: e.target.value })}
                required
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
              />
              Supervisor
            </label>
          </div>

          <input
            type="email"
            className="p-2 mb-2 w-full border rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
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
                ? "Loging in..."
                : buttonDisabled
                ? "Fill in all fields"
                : "Login"}
            </button>
          </div>
          <div className="mt-4 text-center">
            <p className="text-black">
              Forgot password?{" "}
              <Link
                href="/forgotpassword"
                className="text-blue-600 hover:underline"
              >
                Reset here
              </Link>
            </p>
          </div>
        </form>

        <div className="mt-4 text-center">
          <p className="text-black">
            Don't an account?{" "}
            <Link href="/signup" className="text-blue-600 hover:underline">
              Signup here
            </Link>
          </p>
        </div>
        <Toaster />
      </div>
    </div>
  );
}
