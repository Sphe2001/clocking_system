'use client';

import React from 'react';

const ProfilePage = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-r from-indigo-500 to-purple-600">
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center relative p-4 sm:p-8 md:p-16 text-center text-white bg-opacity-60">
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
        <div className="relative z-10 max-w-lg w-full space-y-8">
          <h2 className="text-4xl sm:text-5xl font-extrabold leading-tight text-white">
            Profile
          </h2>
          <p className="text-lg sm:text-xl mb-8 text-white">
            Welcome to your profile page! Here, you can view and edit your information.
          </p>

          {/* Profile Content */}
          <div className="bg-white p-6 rounded-lg shadow-xl space-y-6">
            <h3 className="text-xl font-semibold text-gray-700">User Information</h3>
            <p className="text-lg text-gray-700">Username: JohnDoe</p>
            <p className="text-lg text-gray-700">Email: johndoe@example.com</p>

            {/* Add buttons for editing or logging out */}
            <div className="flex justify-center space-x-4">
              <button className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                Edit Profile
              </button>
              <button className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                Log Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;