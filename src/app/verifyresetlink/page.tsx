"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

export default function VerifyResetLinkPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const urlToken = searchParams.get("token");
    setToken(urlToken);
  }, [searchParams]);

  useEffect(() => {
    const verifyResetLink = async () => {
      if (!token) {
        setLoading(false);
        setError(true);
        return;
      }

      try {
        await axios.post("/api/verifyresetlink/student", { token });
        toast.success("Your link was successfully verified!");
        router.push(`/resetpassword?token=${token}`);
      } catch (error: any) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    verifyResetLink();
  }, [token, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Reset Link Verification
        </h1>

        {loading && (
          <p className="text-gray-600">Verifying your reset link...</p>
        )}

        {error && (
          <p className="text-red-600">
            ❌ Verification failed, invalid link. Please check your emails for
            the correct link.
          </p>
        )}
      </div>
      <Toaster />
    </div>
  );
}
