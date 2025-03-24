"use client";

import React, { useEffect, useState, Suspense } from "react";
import axios from "axios";
import { useSearchParams, useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

function VerifyResetLinkForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token"); // Directly get token
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyResetLink = async () => {
      if (!token) {
        setError(true);
        setLoading(false);
        return;
      }

      try {
        await axios.post("/api/verifyresetlink/admin", { token });
        toast.success("Your link was successfully verified!");
        router.push(`/resetpassword/admin?token=${token}`);
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

        {loading ? (
          <p className="text-gray-600">Verifying your reset link...</p>
        ) : error ? (
          <p className="text-red-600">
            ❌ Verification failed, invalid link. Please check your email for
            the correct link.
          </p>
        ) : null}
      </div>
      <Toaster />
    </div>
  );
}

// Wrap in Suspense to prevent Next.js issues
export default function VerifyResetLinkPage() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <VerifyResetLinkForm />
    </Suspense>
  );
}
