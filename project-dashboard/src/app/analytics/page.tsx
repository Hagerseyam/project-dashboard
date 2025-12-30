"use client";

import { useState, useMemo } from "react";
import { mockProjects, Project } from "../utils/mockProjects";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import ProjectTable from "@/components/ProjectTable";
import dynamic from "next/dynamic";







export default function AnalyticsPage() {

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [assignedFilter, setAssignedFilter] = useState("");
  const role = useSelector((state: RootState) => state.auth.role);

  // Filtered projects
  const filteredProjects: Project[] = useMemo(() => {
    return mockProjects.filter(project => {
      const statusMatch = statusFilter ? project.status === statusFilter : true;
      const priorityMatch = priorityFilter ? project.priority === priorityFilter : true;
      const assignedMatch = assignedFilter ? project.assignedTo === assignedFilter : true;
      return statusMatch && priorityMatch && assignedMatch;
    });
  }, [statusFilter, priorityFilter, assignedFilter]);




    // KPIs
  const totalProjects = filteredProjects.length;
  const completedProjects = filteredProjects.filter(p => p.status === "Completed").length;
  const pendingProjects = filteredProjects.filter(p => p.status === "Pending").length;
  const averageProgress =
    filteredProjects.reduce((sum, p) => sum + p.progress, 0) / (filteredProjects.length || 1);



  return (
    <div className="p-8 min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 font-sans">



 {role === "Developer" ? (
        <p className="mb-4 text-gray-700">
          You can view the projects but cannot make any changes.
        </p>
      ) : null}

      <ProjectTable {...({ viewOnly: role === "Developer" } as any)} />

      {/* --- Activity Feed --- */}
      <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-sm border border-white/50 p-6 hover:shadow-lg transition-all duration-300">
        <h3 className="text-lg font-bold mb-6 text-gray-700 border-l-4 border-indigo-300 pl-3">
          Recent Activity
        </h3>
        <ul className="space-y-3">
          {filteredProjects.slice(0, 5).map((p) => (
            <li key={p.id} className="text-gray-500 text-sm py-3 px-4 rounded-xl hover:bg-indigo-50/50 transition-colors duration-200 flex items-center gap-3 border-b border-gray-100 last:border-0">
              <span className="w-2 h-2 rounded-full bg-indigo-300"></span>
              <span>
                <span className="font-semibold text-gray-700">{p.assignedTo}</span> updated <span className="font-semibold text-indigo-600">{p.name}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
