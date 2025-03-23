'use client'

import { useEffect, useState } from "react";

interface AttendanceRecord {
    username: string;
    surname: string;
    initials: string;
    role: string;
    clock_in: string | null;
    clock_out: string | null;
    status: string;
    date: string;
}

export default function AttendanceTable() {
    const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);
    const [filteredRecords, setFilteredRecords] = useState<AttendanceRecord[]>([]);
    const [roleFilter, setRoleFilter] = useState("All");

    useEffect(() => {
        fetchAttendance();
    }, []);

    const fetchAttendance = async () => {
        try {
            const response = await fetch("/api/admin/users");
            const data = await response.json();
            setAttendanceRecords(data);
            setFilteredRecords(data);
        } catch (error) {
            console.error("Error fetching attendance:", error);
        }
    };

    const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedRole = event.target.value;
        setRoleFilter(selectedRole);

        if (selectedRole === "All") {
            setFilteredRecords(attendanceRecords);
        } else {
            setFilteredRecords(attendanceRecords.filter(record => record.role === selectedRole));
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Today's Attendance</h2>

            {/* Filter Dropdown */}
            <div className="mb-4">
                <label className="mr-2 font-semibold">Filter by Role:</label>
                <select 
                    className="border border-gray-300 p-2 rounded-md text-black"
                    value={roleFilter} 
                    onChange={handleFilterChange}
                >
                    <option value="All">All</option>
                    <option value="student">Students</option>
                    <option value="supervisor">Supervisors</option>
                </select>
            </div>

            {/* Attendance Table */}
            <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border border-gray-300 p-2 text-black">Username</th>
                            <th className="border border-gray-300 p-2 text-black">Surname</th>
                            <th className="border border-gray-300 p-2 text-black">Initials</th>
                            <th className="border border-gray-300 p-2 text-black">Role</th>
                            <th className="border border-gray-300 p-2 text-black">Clock In</th>
                            <th className="border border-gray-300 p-2 text-black">Clock Out</th>
                            <th className="border border-gray-300 p-2 text-black">Status</th>
                            <th className="border border-gray-300 p-2 text-black">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredRecords.length > 0 ? (
                            filteredRecords.map((record, index) => (
                                <tr key={index} className="text-center">
                                    <td className="border border-gray-300 p-2">{record.username}</td>
                                    <td className="border border-gray-300 p-2">{record.surname}</td>
                                    <td className="border border-gray-300 p-2">{record.initials}</td>
                                    <td className="border border-gray-300 p-2">{record.role}</td>
                                    <td className="border border-gray-300 p-2">{record.clock_in || "N/A"}</td>
                                    <td className="border border-gray-300 p-2">{record.clock_out || "N/A"}</td>
                                    <td 
                                        className={`border border-gray-300 p-2 font-semibold ${
                                            record.status === "Late" ? "text-yellow-600" : 
                                            record.status === "Absent" ? "text-red-600" :
                                            record.status === "Attended" ? "text-green-600" : 
                                            "text-gray-600"
                                        }`}
                                    >
                                        {record.status}
                                    </td>
                                    <td className="border border-gray-300 p-2">{record.date}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={8} className="text-center p-4">No attendance records found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
