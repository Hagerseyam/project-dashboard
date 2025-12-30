"use client";

import { useParams } from "next/navigation";
import { mockProjects, Project } from "@/app/utils/mockProjects";
import { useState } from "react";
import Link from "next/link";

export default function ProjectDetailsPage() {
  const { id } = useParams();
  const projectId = Number(id);
  const project: Project | undefined = mockProjects.find(p => p.id === projectId);

  const [tasks, setTasks] = useState([
    { id: 1, title: "Initial Task", done: false },
    { id: 2, title: "Another Task", done: true },
  ]);

  const toggleTask = (taskId: number) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, done: !t.done } : t));
  };

  const addTask = (title: string) => {
    setTasks(prev => [...prev, { id: prev.length + 1, title, done: false }]);
  };

  const deleteTask = (taskId: number) => {
    setTasks(prev => prev.filter(t => t.id !== taskId));
  };

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow-lg text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-rose-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-700 mb-2">Project Not Found</h2>
          <p className="text-gray-500 mb-6">The project you&apos;re looking for doesn&apos;t exist.</p>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const statusColors: Record<string, string> = {
    Pending: "bg-amber-100 text-amber-700 border-amber-200",
    "In Progress": "bg-blue-100 text-blue-700 border-blue-200",
    Completed: "bg-emerald-100 text-emerald-700 border-emerald-200",
  };

  const priorityColors: Record<string, string> = {
    High: "bg-rose-100 text-rose-700 border-rose-200",
    Medium: "bg-amber-100 text-amber-700 border-amber-200",
    Low: "bg-emerald-100 text-emerald-700 border-emerald-200",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-8">
      {/* Back Button */}
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium mb-6 group"
      >
        <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Dashboard
      </Link>

      {/* Project Header */}
      <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-sm border border-white/50 p-8 mb-8">
        <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{project.name}</h1>
            <p className="text-gray-500">Project ID: #{project.id}</p>
          </div>
          <div className="flex gap-3">
            <span className={`px-4 py-2 rounded-xl text-sm font-semibold border ${statusColors[project.status]}`}>
              {project.status}
            </span>
            <span className={`px-4 py-2 rounded-xl text-sm font-semibold border ${priorityColors[project.priority]}`}>
              {project.priority} Priority
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-600">Progress</span>
            <span className="text-sm font-bold text-indigo-600">{project.progress}%</span>
          </div>
          <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full transition-all duration-500"
              style={{ width: `${project.progress}%` }}
            />
          </div>
        </div>

        {/* Project Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-indigo-50/80 rounded-xl p-4 border border-indigo-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-indigo-600/80 font-medium uppercase tracking-wider">Assigned To</p>
                <p className="text-gray-800 font-semibold">{project.assignedTo}</p>
              </div>
            </div>
          </div>

          <div className="bg-emerald-50/80 rounded-xl p-4 border border-emerald-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-emerald-600/80 font-medium uppercase tracking-wider">Budget</p>
                <p className="text-gray-800 font-semibold">${project.budget.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-violet-50/80 rounded-xl p-4 border border-violet-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-violet-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-violet-600/80 font-medium uppercase tracking-wider">Start Date</p>
                <p className="text-gray-800 font-semibold">{project.startDate}</p>
              </div>
            </div>
          </div>

          <div className="bg-rose-50/80 rounded-xl p-4 border border-rose-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-rose-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-rose-600/80 font-medium uppercase tracking-wider">End Date</p>
                <p className="text-gray-800 font-semibold">{project.endDate}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tasks Section */}
      <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-sm border border-white/50 p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-800 border-l-4 border-teal-400 pl-3">Tasks</h2>
            <p className="text-gray-500 text-sm mt-1 ml-4">
              {tasks.filter(t => t.done).length} of {tasks.length} completed
            </p>
          </div>
          <button
            onClick={() => addTask(`New Task ${tasks.length + 1}`)}
            className="flex items-center gap-2 bg-gradient-to-r from-teal-400 to-emerald-500 hover:from-teal-500 hover:to-emerald-600 text-white px-5 py-2.5 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add Task
          </button>
        </div>

        {/* Tasks Progress */}
        <div className="mb-6">
          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-teal-400 to-emerald-500 rounded-full transition-all duration-500"
              style={{ width: `${tasks.length > 0 ? (tasks.filter(t => t.done).length / tasks.length) * 100 : 0}%` }}
            />
          </div>
        </div>

        {/* Task List */}
        <ul className="space-y-3">
          {tasks.map(task => (
            <li
              key={task.id}
              className={`flex items-center justify-between px-5 py-4 rounded-xl border transition-all duration-300 hover:shadow-md ${
                task.done
                  ? "bg-emerald-50/80 border-emerald-100"
                  : "bg-white/60 border-gray-100 hover:border-indigo-100"
              }`}
            >
              <div className="flex items-center gap-4">
                <button
                  onClick={() => toggleTask(task.id)}
                  className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-200 ${
                    task.done
                      ? "bg-emerald-500 border-emerald-500"
                      : "border-gray-300 hover:border-indigo-400"
                  }`}
                >
                  {task.done && (
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
                <span className={`font-medium ${task.done ? "text-gray-500 line-through" : "text-gray-700"}`}>
                  {task.title}
                </span>
              </div>
              <button
                onClick={() => deleteTask(task.id)}
                className="text-gray-400 hover:text-rose-500 p-2 rounded-lg hover:bg-rose-50 transition-all duration-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </li>
          ))}
        </ul>

        {tasks.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <p className="text-gray-500">No tasks yet. Add your first task!</p>
          </div>
        )}
      </div>
    </div>
  );
}
