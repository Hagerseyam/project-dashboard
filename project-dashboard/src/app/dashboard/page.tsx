"use client";

import ProjectTable from "@/components/ProjectTable";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="min-h-screen p-6 bg-gray-100">

          {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white shadow-lg p-6 border-r border-gray-200">
        <h2 className="text-2xl font-bold text-blue-700">Dashboard</h2>
        <nav className="mt-8 flex flex-col gap-3">
          <Link
            href="/analytics"
            className="px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors text-blue-800 font-medium"
          >
            Analytics
          </Link>
          <Link
            href="/projects"
            className="px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors text-blue-800 font-medium"
          >
            Projects
          </Link>
          <Link
            href="/users"
            className="px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors text-blue-800 font-medium"
          >
            Users
          </Link>
        </nav>
      </aside>

      <h1 className="text-3xl font-bold mb-6">Projects Dashboard</h1>
      <ProjectTable />
    </div>
  );
}
