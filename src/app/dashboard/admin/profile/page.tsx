'use client';

import Link from 'next/link';
import React from 'react';

const ProfilePage = () => {
  return (
    <div className="flex h-screen">
        {/* Sidebar */}
        <aside className="w-1/4 bg-blue-700 text-white p-5">
          <h1 className="text-2xl font-bold mb-8">ADMIN PANEL</h1>
          <nav className="space-y-4">
            {["Dashboard", "users", "reports", "profile", "Logout"].map((item) => (
              <div key={item} className="p-2 cursor-pointer hover:bg-blue-500 rounded">
                <Link href={item}> {item} </Link>
              </div>
            ))}
          </nav>
        </aside>
  
        
      </div>
  );
};

export default ProfilePage;