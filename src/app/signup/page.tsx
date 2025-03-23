
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
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    surname: "",
    initials: "",
    contactNo: "",
    password: "",
  });

  useEffect(() => {
    // Disable button if essential fields are not filled
    setButtonDisabled(!(user.username && user.email && user.password && user.surname && user.initials && user.contactNo));
  }, [user]);

  const validateInput = () => {
    let valid = true;
    let newErrors: any = {};
  
    // Role validation based on username (student number or staff number)
    if (user.role === "student") {
      if (!/^\d{9}$/.test(user.username)) {
        newErrors.username = "Student number must be 9 digits.";
        valid = false;
      }
    } else if (user.role === "supervisor") {
      if (!/^\d{6}$/.test(user.username)) {
        newErrors.username = "Staff number must be 6 digits.";
        valid = false;
      }
    }
  
    // Surname validation (only letters, min 4 characters)
    if (!/^[A-Za-z]{4,}$/.test(user.surname)) {
      newErrors.surname = "Surname must have at least 4 Characters.";
      valid = false;
    }
  
    // Initials validation (only letters, between 1 to 6 characters)
    if (!/^[A-Za-z]{1,6}$/.test(user.initials)) {
      newErrors.initials = "Initials must be between 1 to 6 letters/Characters.";
      valid = false;
    }
  
    // Contact Number validation (exactly 10 digits)
    if (!/^\d{10}$/.test(user.contactNo)) {
      newErrors.contactNo = "Contact number must be 10 digits.";
      valid = false;
    }
  
    // Password validation (minimum 4 characters)
    if (user.password.length < 4) {
      newErrors.password = "Password must be at least 4 characters long.";
      valid = false;
    }
  
    setErrors(newErrors);
    return valid;
  };
  

  const onSignup = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validateInput()) {
      return; // Don't submit if validation fails
    }
    
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

    <div className="relative min-h-screen bg-gradient-to-r from-indigo-500 to-purple-600"
      style={{
        backgroundImage: `url('/images/2.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center relative p-4 sm:p-8 md:p-16 text-center text-white">
        <div className="relative z-10 max-w-lg w-full space-y-8">

          {/* Signup Form */}
          <form
            onSubmit={onSignup}
            className="p-6 bg-white rounded-lg shadow-xl space-y-6"
          >
            <h2 className="text-3xl font-bold text-indigo-600 text-center">
              Sign Up
            </h2>

            {/* Role Selection */}
            <div className="mb-6 text-gray-700 flex justify-center gap-6">
              <label className="flex items-center gap-2 transition-transform hover:scale-105 text-red-500">
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
              <label className="flex items-center gap-2 transition-transform hover:scale-105 text-red-500">
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

            {/* Username Input */}
            <div className="relative mb-4">
              {errors.username && (
                <p className="absolute text-red-500 text-sm top-0 left-0 -mt-6 mb-2">{errors.username}</p>
              )}
              <input
                type="text"
                className={`w-full p-3 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.username ? 'border-red-500' : ''}`}
                placeholder="Student/Staff Number"
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                required
              />
            </div>

            {/* Email Input */}
            <div className="relative mb-4">
              {errors.email && (
                <p className="absolute text-red-500 text-sm top-0 left-0 -mt-6 mb-2">{errors.email}</p>
              )}
              <input
                type="email"
                className={`w-full p-3 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.email ? 'border-red-500' : ''}`}
                placeholder="Email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                required
              />
            </div>

            {/* Surname Input */}
            <div className="relative mb-4">
              {errors.surname && (
                <p className="absolute text-red-500 text-sm top-0 left-0 -mt-6 mb-2">{errors.surname}</p>
              )}
              <input
                type="text"
                className={`w-full p-3 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.surname ? 'border-red-500' : ''}`}
                placeholder="Surname"
                value={user.surname}
                onChange={(e) => setUser({ ...user, surname: e.target.value })}
                required
              />
            </div>

            {/* Initials Input */}
            <div className="relative mb-4">
              {errors.initials && (
                <p className="absolute text-red-500 text-sm top-0 left-0 -mt-6 mb-2">{errors.initials}</p>
              )}
              <input
                type="text"
                className={`w-full p-3 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.initials ? 'border-red-500' : ''}`}
                placeholder="Initial(s)"
                value={user.initials}
                onChange={(e) => setUser({ ...user, initials: e.target.value })}
                required
              />
            </div>

            {/* Contact Number Input */}
            <div className="relative mb-4">
              {errors.contactNo && (
                <p className="absolute text-red-500 text-sm top-0 left-0 -mt-6 mb-2">{errors.contactNo}</p>
              )}
              <input
                type="text"
                className={`w-full p-3 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.contactNo ? 'border-red-500' : ''}`}
                placeholder="Contact Number"
                value={user.contactNo}
                onChange={(e) => setUser({ ...user, contactNo: e.target.value })}
                required
              />
            </div>

            {/* Password Input */}
            <div className="relative mb-4">
              {errors.password && (
                <p className="absolute text-red-500 text-sm top-0 left-0 -mt-6 mb-2">{errors.password}</p>
              )}
              <input
                type="password"
                className={`w-full p-3 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.password ? 'border-red-500' : ''}`}
                placeholder="Password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                required
              />
            </div>

            {/* Sign Up Button */}
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
                {loading ? "Signing up..." : buttonDisabled ? "Fill in all fields" : "Sign Up"}
              </button>
            </div>
          </form>

          {/* Login Link */}
          <div className="mt-4 text-center">

            <p className="text-black">

              Already have an account?{" "}
              <Link href="/" className="text-red-500 hover:underline">
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>

      <Toaster />
    </div>
  );
}
