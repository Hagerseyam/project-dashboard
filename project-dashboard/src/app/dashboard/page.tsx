"use client";

import ProjectTable from "@/components/ProjectTable";

export default function DashboardPage() {

  return (

    <div className="min-h-screen flex bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">

      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-700 border-l-4 border-indigo-400 pl-4">Projects Dashboard</h1>
          <p className="text-gray-400 mt-2 ml-5">Manage and track all your projects</p>
        </div>
        <ProjectTable />
      </main>
    </div>
  );
}
