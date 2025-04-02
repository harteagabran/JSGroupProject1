"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Home() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetch("/employees.json")
      .then((response) => response.json())
      .then((data) => setEmployees(data.employees))
      .catch((error) => console.error("Error loading employees:", error));
  }, []);

  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <header className="text-2xl font-bold text-center">
        EmployeeHub - Connect with Your Team
      </header>

      <main className="flex flex-col gap-4 w-full max-w-4xl">
        <input
          type="text"
          placeholder="🔍 Search..."
          className="p-2 border rounded w-full"
        />

        {employees.length === 0 ? (
          <p>Loading employees...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {employees.map((employee) => (
              <div
                key={employee.id}
                className="p-4 border rounded shadow-lg flex flex-col items-center"
              >
                <Image
                  src={employee.photoUrl}
                  alt={employee.name}
                  width={100}
                  height={100}
                  className="rounded-full"
                  style={{ width: "auto", height: "Auto" }}
                  unoptimized
                />
                <h2 className="text-lg font-bold mt-2">{employee.name}</h2>
                <p className="text-gray-500">{employee.role}</p>
                <p className="text-sm text-gray-600 text-center mt-2">
                  {employee.bio}
                </p>
                <p className="text-blue-500 text-sm mt-2">{employee.email}</p>
              </div>
            ))}
          </div>
        )}
      </main>

      <footer className="text-sm text-gray-500">©2025 Halmar Arteaga</footer>
    </div>
  );
}
