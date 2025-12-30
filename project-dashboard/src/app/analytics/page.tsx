"use client";

import { useState, useMemo } from "react";
import { mockProjects, Project } from "../utils/mockProjects";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import ProjectTable from "@/components/ProjectTable";
import dynamic from "next/dynamic";


//trying to improvee the performance by dynamic import of heavy chart components
const ProgressChart = dynamic(() => import("../../components/ProgressChart"), {
  ssr: false,
  loading: () => <div className="h-64 flex items-center justify-center">Loading chart...</div>,
});

const StatusPieChart = dynamic(() => import("../../components/StatusPieChart"), { ssr: false ,  loading: () => <div className="h-64 flex items-center justify-center">Loading chart...</div>,
 });
const RadarChartExample = dynamic(() => import("../../components/RadarChartExample"), { ssr: false,   loading: () => <div className="h-64 flex items-center justify-center">Loading chart...</div>,
 });
const JointLineScatterChart = dynamic(() => import("../../components/BubbleChart"), { ssr: false,   loading: () => <div className="h-64 flex items-center justify-center">Loading chart...</div>,
 });






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

  const memoizedProgressChart = useMemo(
  () => <ProgressChart projects={filteredProjects} />,
  [filteredProjects]
);

const memoizedStatusPieChart = useMemo(
  () => <StatusPieChart projects={filteredProjects} />,
  [filteredProjects]
);
const memoizedRadarChartExample = useMemo(
  () => <RadarChartExample projects={filteredProjects} />,
  [filteredProjects]
);
const memoizedJointLineScatterChart = useMemo(
  () => <JointLineScatterChart projects={filteredProjects} />,
  [filteredProjects]
);


    // KPIs
  const totalProjects = filteredProjects.length;
  const completedProjects = filteredProjects.filter(p => p.status === "Completed").length;
  const pendingProjects = filteredProjects.filter(p => p.status === "Pending").length;
  const averageProgress =
    filteredProjects.reduce((sum, p) => sum + p.progress, 0) / (filteredProjects.length || 1);



  return (
    <div className="p-8 min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 font-sans">
      {/* --- KPIs --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-blue-50/80 backdrop-blur-sm border border-blue-100 rounded-2xl shadow-sm p-6 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
          <h3 className="text-blue-600/80 text-xs font-bold uppercase tracking-wider">Total Projects</h3>
          <p className="text-3xl text-gray-800 font-extrabold mt-2">{totalProjects}</p>
        </div>
        <div className="bg-emerald-50/80 backdrop-blur-sm border border-emerald-100 rounded-2xl shadow-sm p-6 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
          <h3 className="text-emerald-600/80 text-xs font-bold uppercase tracking-wider">Completed Projects</h3>
          <p className="text-3xl text-gray-800 font-extrabold mt-2">{completedProjects}</p>
        </div>
        <div className="bg-amber-50/80 backdrop-blur-sm border border-amber-100 rounded-2xl shadow-sm p-6 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
          <h3 className="text-amber-600/80 text-xs font-bold uppercase tracking-wider">Pending Projects</h3>
          <p className="text-3xl text-gray-800 font-extrabold mt-2">{pendingProjects}</p>
        </div>
        <div className="bg-violet-50/80 backdrop-blur-sm border border-violet-100 rounded-2xl shadow-sm p-6 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
          <h3 className="text-violet-600/80 text-xs font-bold uppercase tracking-wider">Average Progress</h3>
          <p className="text-3xl text-gray-800 font-extrabold mt-2">{averageProgress.toFixed(1)}%</p>
        </div>
      </div>

    {/* --- Charts Section --- */}
    {filteredProjects.length > 0 && (
    <div className="mb-8 grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* Progress Chart Card */}
        <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-sm border border-white/50 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
        <h3 className="text-lg font-bold mb-4 text-gray-700 border-l-4 border-teal-300 pl-3 group-hover:text-teal-600 transition-colors">
            Project Progress
        </h3>
        {memoizedProgressChart}
        <p className="text-sm text-gray-400 mt-4 font-medium">
            Shows the overall completion percentage of each project based on current progress.
        </p>
        </div>

        {/* Status Pie Chart Card */}
        <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-sm border border-white/50 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col group">
        <h3 className="text-lg font-bold mb-6 text-gray-700 border-l-4 border-yellow-300 pl-3 group-hover:text-yellow-600 transition-colors">
            Status Distribution
        </h3>
        <div className="flex justify-center flex-grow items-center">
            {memoizedStatusPieChart}
        </div>
        <p className="text-sm text-gray-400 mt-4 font-medium">
            Displays the proportion of projects in Pending, In Progress, and Completed status.
        </p>
        </div>

        {/* Radar Chart Card */}
        <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-sm border border-white/50 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col group">
        <h3 className="text-lg font-bold mb-6 text-gray-700 border-l-4 border-blue-300 pl-3 group-hover:text-blue-600 transition-colors">
            Project Status
        </h3>
        {memoizedRadarChartExample}
        <p className="text-sm text-gray-400 mt-4 font-medium">
            Compares multiple project metrics such as progress, priority, and resource allocation in a radar format.
        </p>
        </div>

        {/* Bubble Chart Card */}
        <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-sm border border-white/50 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-x-auto group">
        <h3 className="text-lg font-bold mb-4 text-gray-700 border-l-4 border-purple-300 pl-3 group-hover:text-purple-600 transition-colors">
            Joint Line Scatter Chart
        </h3>
      {memoizedJointLineScatterChart}
        <p className="text-sm text-gray-400 mt-4 font-medium">
            Shows correlations between project metrics such as budget, progress, and team performance.
        </p>
        </div>

    </div>
    )}



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
