"use client";

import { useState, useMemo, useEffect } from "react";
import useSWR from "swr";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { mockProjects , Project } from "../app/utils/mockProjects"; // adjust the path if needed
import { 
  MagnifyingGlassIcon, 
  ClipboardDocumentListIcon, 
  FlagIcon, 
  UserIcon, 
  ArrowPathIcon 
} from "@heroicons/react/24/outline";


import { useRouter } from "next/navigation";
import ProgressChart from "./ProgressChart";
import StatusPieChart from "./StatusPieChart";
import RadarChartExample from "./RadarChartExample";
import JointLineScatterChart from "./BubbleChart";

const fetcher = async () => {
  await new Promise((res) => setTimeout(res, 300));
  return mockProjects;
};

export default function ProjectTable() {

const { data: projects, error, isLoading } = useSWR<Project[]>(
  "projects",
  fetcher
);
  const role = useSelector((state: RootState) => state.auth.role);
  const [editableProjects, setEditableProjects] = useState<Project[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 10;
  const [sortField, setSortField] = useState<keyof Project | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [priorityFilter, setPriorityFilter] = useState<string>("");
  const [assignedFilter, setAssignedFilter] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const router = useRouter();


    useEffect(() => {
      if (projects) {
        setEditableProjects(projects);
      }
    }, [projects]);


  const handleEdit = (id: number, field: keyof Project, value: any) => {
    if (role === "Admin" || (role === "ProjectManager" && (field === "status" || field === "progress"))) {
      setEditableProjects(prev =>
        prev.map(p => (p.id === id ? { ...p, [field]: value } : p))
      );
    }
  };


// Filter with search
const filteredProjects = useMemo(() => {
  return editableProjects.filter(project => {
    const statusMatch = statusFilter ? project.status === statusFilter : true;
    const priorityMatch = priorityFilter ? project.priority === priorityFilter : true;
    const assignedMatch = assignedFilter ? project.assignedTo === assignedFilter : true;
    const searchMatch = search
      ? project.name.toLowerCase().includes(search.toLowerCase())
      : true;

    return statusMatch && priorityMatch && assignedMatch && searchMatch;
  });
}, [editableProjects, statusFilter, priorityFilter, assignedFilter, search]);


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
  


  // Sort
  const sortedProjects = useMemo(() => {
    if (!sortField) return filteredProjects;
    return [...filteredProjects].sort((a, b) => {
      const aVal = a[sortField];
      const bVal = b[sortField];
      if (typeof aVal === "number" && typeof bVal === "number") {
        return sortOrder === "asc" ? aVal - bVal : bVal - aVal;
      } else {
        return sortOrder === "asc"
          ? String(aVal).localeCompare(String(bVal))
          : String(bVal).localeCompare(String(aVal));
      }
    });
  }, [filteredProjects, sortField, sortOrder]);

  // Pagination
  const totalPages = Math.ceil(sortedProjects.length / projectsPerPage);

  const paginatedProjects = useMemo(() => {
    const start = (currentPage - 1) * projectsPerPage;
    return sortedProjects.slice(start, start + projectsPerPage);
  }, [sortedProjects, currentPage]);



    // KPIs
  const totalProjects = filteredProjects.length;
  const completedProjects = filteredProjects.filter(p => p.status === "Completed").length;
  const pendingProjects = filteredProjects.filter(p => p.status === "Pending").length;
  const averageProgress =
    filteredProjects.reduce((sum, p) => sum + p.progress, 0) / (filteredProjects.length || 1);


return (
  <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-2xl shadow-lg p-8 min-h-screen">
  {/* Header */}
  <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
    <h2 className="text-2xl font-bold text-gray-700 border-l-4 border-indigo-300 pl-3">
      Projects
    </h2>

</div>

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





  {/* Controls */}
    <div className="bg-white/60 backdrop-blur-md rounded-2xl p-5 mb-6 flex flex-wrap items-center gap-4 shadow-sm border border-white/50">
      
      {/* Search Bar */}
      <div className="flex text-gray-700 items-center bg-white/80 backdrop-blur-sm rounded-xl px-4 py-3 flex-1 min-w-[200px] focus-within:ring-2 focus-within:ring-indigo-300 focus-within:border-indigo-200 transition-all duration-300 border border-indigo-100 hover:shadow-md">
        <MagnifyingGlassIcon className="w-5 h-5 text-indigo-400 mr-3" />
        <input
          type="text"
          placeholder="Search projects..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full text-sm outline-none bg-transparent placeholder-gray-400"
        />
      </div>

      {/* Status Filter */}
      <div className="flex text-gray-700 items-center bg-emerald-50/80 backdrop-blur-sm rounded-xl px-4 py-3 min-w-[150px] border border-emerald-100 hover:shadow-md transition-all duration-300">
        <ClipboardDocumentListIcon className="w-5 h-5 text-emerald-500 mr-3" />
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="w-full text-sm outline-none bg-transparent cursor-pointer"
        >
          <option value="">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      {/* Priority Filter */}
      <div className="flex text-gray-700 items-center bg-amber-50/80 backdrop-blur-sm rounded-xl px-4 py-3 min-w-[150px] border border-amber-100 hover:shadow-md transition-all duration-300">
        <FlagIcon className="w-5 h-5 text-amber-500 mr-3" />
        <select
          value={priorityFilter}
          onChange={e => setPriorityFilter(e.target.value)}
          className="w-full text-sm outline-none bg-transparent cursor-pointer"
        >
          <option value="">All Priorities</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>

      {/* Assigned User Filter */}
      <div className="flex text-gray-700 items-center bg-violet-50/80 backdrop-blur-sm rounded-xl px-4 py-3 min-w-[150px] border border-violet-100 hover:shadow-md transition-all duration-300">
        <UserIcon className="w-5 h-5 text-violet-500 mr-3" />
        <select
          value={assignedFilter}
          onChange={e => setAssignedFilter(e.target.value)}
          className="w-full text-gray-700 text-sm outline-none bg-transparent cursor-pointer"
        >
          <option value="">All Users</option>
          <option value="Developer">Developer</option>
          <option value="Admin">Admin</option>
          <option value="ProjectManager">Project Manager</option>
        </select>
      </div>

      {/* Reset Filters Button */}
      <button
        onClick={() => {
          setStatusFilter("");
          setPriorityFilter("");
          setAssignedFilter("");
          setSearch("");
        }}
        className="flex items-center bg-gradient-to-r from-indigo-100 to-purple-100 rounded-xl px-4 py-3 text-sm font-semibold text-indigo-700 hover:from-indigo-200 hover:to-purple-200 hover:shadow-md transition-all duration-300 border border-indigo-100"
      >
        <ArrowPathIcon className="w-5 h-5 mr-2" />
        Reset Filters
      </button>
    </div>


{/* Table */}
<div className="overflow-x-auto rounded-2xl border border-white/50 bg-white/70 backdrop-blur-md shadow-sm">
  <table className="min-w-full text-sm">
    <thead className="bg-gradient-to-r from-indigo-50 to-purple-50 text-gray-700">
      <tr>
        <th className="px-5 py-4 text-left font-bold text-xs uppercase tracking-wider text-indigo-600">Name</th>
        <th className="px-5 py-4 text-left font-bold text-xs uppercase tracking-wider text-indigo-600">Status</th>
        <th className="px-5 py-4 text-left font-bold text-xs uppercase tracking-wider text-indigo-600">Priority</th>
        <th className="px-5 py-4 text-left font-bold text-xs uppercase tracking-wider text-indigo-600">Assigned To</th>
        <th className="px-5 py-4 text-left font-bold text-xs uppercase tracking-wider text-indigo-600">Start Date</th>
        <th className="px-5 py-4 text-left font-bold text-xs uppercase tracking-wider text-indigo-600">End Date</th>
        <th className="px-5 py-4 text-left font-bold text-xs uppercase tracking-wider text-indigo-600">Progress</th>
        <th className="px-5 py-4 text-left font-bold text-xs uppercase tracking-wider text-indigo-600">Budget</th>
        <th className="px-5 py-4 text-left font-bold text-xs uppercase tracking-wider text-indigo-600">Actions</th>
      </tr>
    </thead>

    <tbody>
      {paginatedProjects.map((project) => (
        <tr
          key={project.id}
          className="border-t border-indigo-50 hover:bg-indigo-50/50 transition-all duration-200">
          {/* Name */}
          <td className="px-5 py-4 font-semibold text-gray-700">{project.name}</td>

          {/* Status */}
          <td className="px-5 py-4">
            {(role === "Admin" || role === "ProjectManager") ? (
              <select
                value={project.status}
                onChange={(e) => handleEdit(project.id, "status", e.target.value)}
                className="border border-indigo-100 px-3 py-1.5 rounded-lg text-sm text-gray-700 bg-white/80 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-200"
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            ) : (
              <span
                className={`px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm
                  ${project.status === "Completed" && "bg-emerald-100 text-emerald-600 border border-emerald-200"}
                  ${project.status === "In Progress" && "bg-blue-100 text-blue-600 border border-blue-200"}
                  ${project.status === "Pending" && "bg-amber-100 text-amber-600 border border-amber-200"}`}
              >
                {project.status}
              </span>
            )}
          </td>

          {/* Priority */}
          <td className="px-5 py-4">
            <span
              className={`px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm
                ${project.priority === "High" && "bg-rose-100 text-rose-600 border border-rose-200"}
                ${project.priority === "Medium" && "bg-amber-100 text-amber-600 border border-amber-200"}
                ${project.priority === "Low" && "bg-emerald-100 text-emerald-600 border border-emerald-200"}`}
            >
              {project.priority}
            </span>
          </td>

          {/* Assigned User */}
          <td className="px-5 py-4 text-gray-600 font-medium">{project.assignedTo}</td>

          {/* Dates */}
          <td className="px-5 py-4 text-gray-500">{project.startDate}</td>
          <td className="px-5 py-4 text-gray-500">{project.endDate}</td>
          {/* Progress */}
          <td className="px-5 py-4">
            {(role === "Admin" || role === "ProjectManager") ? (
              <>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={project.progress}
                  onChange={(e) => handleEdit(project.id, "progress", Number(e.target.value))}
                  className="w-full accent-indigo-500"
                />
                <div className="w-full bg-gray-100 rounded-full h-2.5 mt-1.5 overflow-hidden">
                  <div
                    className={`h-2.5 rounded-full transition-all duration-300
                      ${project.progress < 50
                        ? "bg-gradient-to-r from-rose-400 to-rose-500"
                        : project.progress < 80
                        ? "bg-gradient-to-r from-amber-400 to-amber-500"
                        : "bg-gradient-to-r from-emerald-400 to-emerald-500"}`}
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
                <span className="text-xs text-gray-600 font-medium mt-1">{project.progress}%</span>
              </>
            ) : (
              <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                <div
                  className="h-2.5 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full transition-all duration-300"
                  style={{ width: `${project.progress}%` }}
                />
              </div>
            )}
          </td>

          {/* Budget */}
          <td className="px-5 py-4">
            {role === "Admin" ? (
              <input
                type="number"
                value={project.budget}
                onChange={(e) => handleEdit(project.id, "budget", Number(e.target.value))}
                className="border border-indigo-100 px-3 py-1.5 w-28 rounded-lg text-sm text-gray-700 bg-white/80 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-200"
              />
            ) : (
              <span className="font-semibold text-gray-700">${project.budget.toLocaleString()}</span>
            )}
          </td>


          {/* Actions: View More */}
          <td className="px-5 py-4">
        <button
  onClick={() => router.push(`/projects/${project.id}`)}
  className="px-3 py-1.5 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition"
>
  View More
</button>

          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>



    {/* Pagination */}
    <div className="flex items-center justify-between mt-6 text-sm">
      <button
        onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
        disabled={currentPage === 1}
        className="px-5 py-2.5 text-indigo-700 bg-white/80 backdrop-blur-sm border border-indigo-100 rounded-xl disabled:opacity-40 hover:bg-indigo-50 hover:shadow-md transition-all duration-300 font-medium"
      >
        ← Previous
      </button>

      <span className="text-gray-600 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/50">
        Page <strong className="text-indigo-600">{currentPage}</strong> of <strong className="text-indigo-600">{totalPages}</strong>
      </span>

      <button
        onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl disabled:opacity-40 hover:from-indigo-600 hover:to-purple-600 hover:shadow-md transition-all duration-300 font-medium"
      >
        Next →
      </button>
    </div>
  </div>
);

}