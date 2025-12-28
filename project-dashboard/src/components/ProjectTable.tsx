"use client";

import React, { useState, useMemo, useEffect } from "react";
import useSWR from "swr";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import ProjectSkeleton from "./ProjectSkeleton";
import ProgressChart from "./ProgressChart";
import RadarChartExample from "./RadarChartExample";
import StatusPieChart from "./StatusPieChart";
import { mockProjects , Project } from "../app/utils/mockProjects"; // adjust the path if needed
import { 
  MagnifyingGlassIcon, 
  ClipboardDocumentListIcon, 
  FlagIcon, 
  UserIcon, 
  ArrowPathIcon 
} from "@heroicons/react/24/outline";
import BubbleChart from "./BubbleChart";
import JointLineScatterChart from "./BubbleChart";


// type Project = {
//   id: number;
//   name: string;
//   status: "Pending" | "In Progress" | "Completed" | string;
//   priority: "High" | "Medium" | "Low" | string;
//   assignedTo: string; // username or role
//   startDate: string;
//   endDate: string;
//   progress: number;
//   budget: number;
// };


// const mockProjects: Project[] = [
//   { id: 1, name: "Website Redesign", status: "In Progress", priority: "High", assignedTo: "Developer", startDate: "2025-12-01", endDate: "2025-12-31", progress: 45, budget: 5000 },
//   { id: 2, name: "Mobile App", status: "Pending", priority: "Medium", assignedTo: "ProjectManager", startDate: "2025-12-10", endDate: "2026-01-20", progress: 0, budget: 12000 },
//   { id: 3, name: "Marketing Campaign", status: "Completed", priority: "Low", assignedTo: "Admin", startDate: "2025-11-01", endDate: "2025-11-30", progress: 100, budget: 3000 },
//   { id: 4, name: "Backend Refactor", status: "In Progress", priority: "High", assignedTo: "Developer", startDate: "2025-12-05", endDate: "2025-12-25", progress: 60, budget: 8000 },
// ];

const fetcher = async () => {
  await new Promise((res) => setTimeout(res, 300));
  return mockProjects;
};


export default function ProjectTable() {

  const { data: projects, error, isLoading } = useSWR<Project[]>("projects", fetcher);
  const role = useSelector((state: RootState) => state.auth.role);
  const [editableProjects, setEditableProjects] = useState<Project[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 2;
  const [sortField, setSortField] = useState<keyof Project | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [priorityFilter, setPriorityFilter] = useState<string>("");
  const [assignedFilter, setAssignedFilter] = useState<string>("");
  const [search, setSearch] = useState<string>("");

  
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



  // Filter
const filteredProjects = useMemo(() => {
  return editableProjects.filter(project => {
    const statusMatch = statusFilter ? project.status === statusFilter : true;
    const priorityMatch = priorityFilter ? project.priority === priorityFilter : true;
    const assignedMatch = assignedFilter ? project.assignedTo === assignedFilter : true;
    return statusMatch && priorityMatch && assignedMatch;
  });
}, [editableProjects, statusFilter, priorityFilter, assignedFilter]);





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

  const handleSort = (field: keyof Project) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };


<tbody>
  {isLoading
    ? Array.from({ length: 4 }).map((_, i) => <ProjectSkeleton key={i} />)
    : paginatedProjects.map(project => (
        <tr key={project.id} className="border-t hover:bg-gray-50 transition">
          {/* Your existing project row code here */}
        </tr>
      ))}
</tbody>


return (
  <div className="bg-white rounded-xl shadow-md p-6">
  {/* Header */}
  <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
    <h2 className="text-lg font-semibold text-gray-500">
      Projects
    </h2>

  {/* Controls */}
    <div className="bg-gray-100 rounded-xl p-4 mb-4 flex flex-wrap items-center gap-4 shadow-sm">
      
      {/* Search Bar */}
      <div className="flex items-center bg-white rounded-md px-3 py-2 flex-1 min-w-[200px] focus-within:ring-2 focus-within:ring-blue-500 transition">
        <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 mr-2" />
        <input
          type="text"
          placeholder="Search projects..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full text-sm outline-none"
        />
      </div>

      {/* Status Filter */}
      <div className="flex items-center bg-white rounded-md px-3 py-2 min-w-[150px]">
        <ClipboardDocumentListIcon className="w-5 h-5 text-gray-400 mr-2" />
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="w-full text-sm outline-none bg-transparent"
        >
          <option value="">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      {/* Priority Filter */}
      <div className="flex items-center bg-white rounded-md px-3 py-2 min-w-[150px]">
        <FlagIcon className="w-5 h-5 text-gray-400 mr-2" />
        <select
          value={priorityFilter}
          onChange={e => setPriorityFilter(e.target.value)}
          className="w-full text-sm outline-none bg-transparent"
        >
          <option value="">All Priorities</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>

      {/* Assigned User Filter */}
      <div className="flex items-center bg-white rounded-md px-3 py-2 min-w-[150px]">
        <UserIcon className="w-5 h-5 text-gray-400 mr-2" />
        <select
          value={assignedFilter}
          onChange={e => setAssignedFilter(e.target.value)}
          className="w-full text-sm outline-none bg-transparent"
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
        className="flex items-center bg-white rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 transition"
      >
        <ArrowPathIcon className="w-5 h-5 mr-2" />
        Reset Filters
      </button>
    </div>

</div>

{/* --- Charts Section --- */}
{filteredProjects.length > 0 && (
  <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
    {/* Progress Chart Card */}
    <div className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg hover:bg-gray-50 transition">
      <h3 className="text-md font-semibold mb-2 text-gray-700 border-l-4 border-teal-400 pl-2">
        Project Progress
      </h3>
      <ProgressChart projects={filteredProjects} />
    </div>

      {/* Status Pie Chart Card */}
    <div className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg hover:bg-gray-50 transition flex flex-col">
      <h3 className="text-md font-semibold mb-4 text-gray-700 border-l-4 border-yellow-400 pl-2">
        Status Distribution
      </h3>
      <div className="flex justify-center">
        <StatusPieChart projects={filteredProjects} />
      </div>
    </div>


    {/* Radar Chart Card */}
    <div className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg hover:bg-gray-50 transition flex flex-col">
      
      <h3 className="text-md font-semibold mb-4 text-gray-700 border-l-4 border-blue-400 pl-2">
        Project Status
      </h3>
      <RadarChartExample />
    </div>


    {/* Bubble Chart Card */}
    <div className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg hover:bg-gray-50 transition overflow-x-auto">
      <h3 className="text-md font-semibold mb-2 text-gray-700 border-l-4 border-purple-400 pl-2">
      Joint Line Scatter Chart   
      </h3>

      <JointLineScatterChart projects={filteredProjects} />
    </div>
  </div>
)}


{/* Table */}
<div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm">
  <table className="min-w-full text-sm">
    <thead className="bg-gray-100 text-gray-700">
      <tr>
        <th className="px-4 py-3 text-left font-medium">Name</th>
        <th className="px-4 py-3 text-left font-medium">Status</th>
        <th className="px-4 py-3 text-left font-medium">Priority</th>
        <th className="px-4 py-3 text-left font-medium">Assigned To</th>
        <th className="px-4 py-3 text-left font-medium">Start Date</th>
        <th className="px-4 py-3 text-left font-medium">End Date</th>
        <th className="px-4 py-3 text-left font-medium">Progress</th>
        <th className="px-4 py-3 text-left font-medium">Budget</th>
      </tr>
    </thead>

    <tbody>
      {paginatedProjects.map((project) => (
        <tr
          key={project.id}
          className="border-t hover:bg-gray-50 transition">
          {/* Name */}
          <td className="px-4 py-3 font-medium text-gray-800">
            {project.name}
          </td>

          {/* Status */}
          <td className="px-4 py-3">
            {(role === "Admin" || role === "ProjectManager") ? (
              <select
                value={project.status}
                onChange={(e) =>
                  handleEdit(project.id, "status", e.target.value)
                }
                className="border px-2 py-1 rounded text-sm"
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            ) : (
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium
                  ${project.status === "Completed" && "bg-green-100 text-green-700"}
                  ${project.status === "In Progress" && "bg-blue-100 text-blue-700"}
                  ${project.status === "Pending" && "bg-yellow-100 text-yellow-700"}
                `}
              >
                {project.status}
              </span>
            )}
          </td>

          {/* Priority */}
          <td className="px-4 py-3">
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium
                ${project.priority === "High" && "bg-red-100 text-red-700"}
                ${project.priority === "Medium" && "bg-yellow-100 text-yellow-700"}
                ${project.priority === "Low" && "bg-green-100 text-green-700"}
              `}
            >
              {project.priority}
            </span>
          </td>

          {/* Assigned User */}
          <td className="px-4 py-3 text-gray-700">
            {project.assignedTo}
          </td>

          {/* Dates */}
          <td className="px-4 py-3 text-gray-600">{project.startDate}</td>
          <td className="px-4 py-3 text-gray-600">{project.endDate}</td>

          {/* Progress */}
          <td className="px-4 py-3">
            {(role === "Admin" || role === "ProjectManager") ? (
              <>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={project.progress}
                  onChange={(e) =>
                    handleEdit(project.id, "progress", Number(e.target.value))
                  }
                  className="w-full"
                />
                <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                  <div
                    className={`h-2 rounded-full transition-all
                      ${project.progress < 50
                        ? "bg-red-500"
                        : project.progress < 80
                        ? "bg-yellow-500"
                        : "bg-green-500"}
                    `}
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
                <span className="text-xs text-gray-600">
                  {project.progress}%
                </span>
              </>
            ) : (
              <>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="h-2 bg-blue-500 rounded-full"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
                <span className="text-xs text-gray-600">
                  {project.progress}%
                </span>
              </>
            )}
          </td>

          {/* Budget */}
          <td className="px-4 py-3">
            {role === "Admin" ? (
              <input
                type="number"
                value={project.budget}
                onChange={(e) =>
                  handleEdit(project.id, "budget", Number(e.target.value))
                }
                className="border px-2 py-1 w-24 rounded text-sm"
              />
            ) : (
              <span className="font-medium text-gray-800">
                ${project.budget.toLocaleString()}
              </span>
            )}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>



    {/* Pagination */}
    <div className="flex items-center justify-between mt-4 text-sm">
      <button
        onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
        disabled={currentPage === 1}
        className="px-3 py-2 border rounded-md disabled:opacity-50 hover:bg-gray-100"
      >
        Previous
      </button>

      <span className="text-gray-600">
        Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
      </span>

      <button
        onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="px-3 py-2 border rounded-md disabled:opacity-50 hover:bg-gray-100"
      >
        Next
      </button>
    </div>
  </div>
);

}
