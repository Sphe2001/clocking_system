"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [token, setToken] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const urlToken = searchParams.get("token");
    setToken(urlToken);
  }, [searchParams]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (!token) {
      toast.error("Invalid token. Please try again.");
      return;
    }

    setLoading(true);

    try {
      await axios.post("/api/resetpassword/student", {
        password,
        token,
      });

      toast.success("Password successfully updated!");
      router.push("/");
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Reset Password
          </h1>

          {token ? (
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
              <input
                type="password"
                placeholder="New Password"
                className="p-2 border rounded-lg w-full text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <input
                type="password"
                placeholder="Confirm Password"
                className="p-2 border rounded-lg w-full text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />

              <button
                type="submit"
                className={`p-2 w-full rounded-lg text-white ${
                  loading
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-black hover:bg-gray-800"
                }`}
                disabled={loading}
              >
                {loading ? "Updating Password..." : "Reset Password"}
              </button>
            </form>
          ) : (
            <div>
              <p className="text-red-600">
                ❌ Invalid link. Please use the link from your email to reset
                your password.
              </p>
              <Link
                href="/login"
                className="text-blue-600 hover:underline mt-4 inline-block"
              >
                Go to Login Page
              </Link>
            </div>
          )}
        </div>
        <Toaster />
      </div>
    </div>
  );
}
