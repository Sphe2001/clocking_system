"use client";

import { useRouter } from "next/navigation";
import axios from "axios";
import React from "react";
import Link from "next/link";

export default function Sidebar() {
    const router = useRouter();

    const handleLogout = async () => {
        await axios.get("/api/logout");
        router.push("/");
    };

    return (
        <div>
            {/* Sidebar */}
            <aside className="w-1/4 bg-blue-700 text-white p-5">
                <h1 className="text-2xl font-bold mb-8">ADMIN PANEL</h1>
                <nav className="space-y-4">
                <div className="p-2 cursor-pointer hover:bg-blue-500 rounded">
                    <Link href="/dashboard/admin">Dashboard</Link>
                </div>
                <div className="p-2 cursor-pointer hover:bg-blue-500 rounded">
                    <Link href="/dashboard/admin/users">Users</Link>
                </div>
                <div className="p-2 cursor-pointer hover:bg-blue-500 rounded">
                    <Link href="/dashboard/admin/reports">Reports</Link>
                </div>
                <div className="p-2 cursor-pointer hover:bg-blue-500 rounded">
                    <Link href="/dashboard/admin/profile">Profile</Link>
                </div>
                <div
                    className="p-2 cursor-pointer hover:bg-red-500 rounded"
                    onClick={handleLogout}
                >
                    Logout
                </div>
                </nav>
            </aside>
        </div>
    );
}