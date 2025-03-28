'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setButtonDisabled(!(email));
  }, [email]);

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("/api/forgotpassword/admin", { email });
      toast.success('Request Sent');
      router.push('/adminlogin');
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Request failed');
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
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
        <div className="relative z-10 max-w-lg w-full space-y-8">
          <h2 className="text-4xl sm:text-5xl font-extrabold leading-tight text-white">
            Forgot Password
          </h2>
          <p className="text-lg sm:text-xl mb-8 text-white">
            Please enter your email to reset your password.
          </p>

          {/* Form */}
          <form onSubmit={onSubmit} className="p-6 bg-white rounded-lg shadow-xl space-y-6">
            {/* Email Input */}
            <input
              type="email"
              className="w-full p-3 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            {/* Send Request Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                className={`w-full py-3 rounded-lg text-white font-semibold ${
                  buttonDisabled || loading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-indigo-600 hover:bg-indigo-700'
                }`}
                disabled={buttonDisabled || loading}
              >
                {loading
                  ? 'Sending request...'
                  : buttonDisabled
                  ? 'Fill in all fields'
                  : 'Send request'}
              </button>
            </div>
          </form>
        </div>
      </div>

      <Toaster />
    </div>
  );
}