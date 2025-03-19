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
        const response = await axios.post("/api/forgotpassword/supervisor", {email});
        toast.success('Request Sent');
        router.push('/');
        } catch (error: any) {
        toast.error(error.response?.data?.error || 'Request failed');
        } finally {
        setLoading(false);
        }
    };
  return (
    <div>
      
          <div className="flex flex-col items-center justify-center min-h-screen bg-white">
        <form onSubmit={onSubmit} className="p-6 bg-gray-200 rounded-lg w-80 shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-black text-center">Forgot Password</h2>
          <input
            type="email"
            className="p-2 mb-2 w-full border rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value )}
            required
          />

          <div className="flex justify-center">
            <button
              type="submit"
              className={`p-2 w-full rounded-lg text-white ${buttonDisabled || loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-black hover:bg-gray-800'}`}
              disabled={buttonDisabled || loading}
            >
              {loading ? 'Sending request...' : buttonDisabled ? 'Fill in all fields' : 'Send request'}
            </button>
          </div>
        </form>
        <Toaster />
      </div>
    </div>
    
  )
}
