'use client';

import React from 'react';

const ReportsPage = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-r from-indigo-500 to-purple-600">
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center relative p-4 sm:p-8 md:p-16 text-center text-white bg-opacity-60">
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
        <div className="relative z-10 max-w-lg w-full space-y-8">
          <h2 className="text-4xl sm:text-5xl font-extrabold leading-tight text-white">
            Reports
          </h2>
          <p className="text-lg sm:text-xl mb-8 text-white">
            Welcome to the report page! Here you can view and manage the reports.
          </p>

          {/* Reports Content */}
          <div className="bg-white p-6 rounded-lg shadow-xl space-y-6">
            <h3 className="text-xl font-semibold text-gray-700">Report Overview</h3>
            <p className="text-lg text-gray-700 mb-4">This section contains the latest reports and insights.</p>

            {/* Add Report Table or Content */}
            <table className="w-full table-auto text-gray-700">
              <thead className="bg-gray-200">
                <tr>
                  <th className="p-3 text-left">Report ID</th>
                  <th className="p-3 text-left">Report Title</th>
                  <th className="p-3 text-left">Date</th>
                  <th className="p-3 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-3">#101</td>
                  <td className="p-3">Sales Report</td>
                  <td className="p-3">2025-03-15</td>
                  <td className="p-3 text-green-600">Completed</td>
                </tr>
                <tr>
                  <td className="p-3">#102</td>
                  <td className="p-3">Marketing Analysis</td>
                  <td className="p-3">2025-03-14</td>
                  <td className="p-3 text-yellow-600">Pending</td>
                </tr>
                {/* More rows can be added here */}
              </tbody>
            </table>

            {/* Buttons for viewing more reports or creating a new report */}
            <div className="flex justify-center space-x-4">
              <button className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                View More Reports
              </button>
              <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                Create New Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;