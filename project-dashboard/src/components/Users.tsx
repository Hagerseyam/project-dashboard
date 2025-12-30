"use client";

import { useState, useMemo, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import UserSkeleton from "./UserSkeleton";

type User = {
  id: number;
  name: string;
  email: string;
  role: "Admin" | "ProjectManager" | "Developer";
  status: "Active" | "Inactive";
};

const mockUsers: User[] = [
  { id: 1, name: "Alice", email: "alice@example.com", role: "Admin", status: "Active" },
  { id: 2, name: "Bob", email: "bob@example.com", role: "ProjectManager", status: "Active" },
  { id: 3, name: "Charlie", email: "charlie@example.com", role: "Developer", status: "Inactive" },
];

export default function Users() {
  const role = useSelector((state: RootState) => state.auth.role);
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate fetch
    setTimeout(() => {
      setUsers(mockUsers);
      setIsLoading(false);
    }, 500);
  }, []);

  const filteredUsers = useMemo(() => {
    return users.filter(user => 
      (search ? user.name.toLowerCase().includes(search.toLowerCase()) || user.email.toLowerCase().includes(search.toLowerCase()) : true)
      && (roleFilter ? user.role === roleFilter : true)
      && (statusFilter ? user.status === statusFilter : true)
    );
  }, [users, search, roleFilter, statusFilter]);

  const handleStatusChange = (id: number, value: "Active" | "Inactive") => {
    if (role !== "Admin") return;
    setUsers(prev => prev.map(u => u.id === id ? { ...u, status: value } : u));
  };

  const handleRoleChange = (id: number, value: User["role"]) => {
    if (role !== "Admin") return;
    setUsers(prev => prev.map(u => u.id === id ? { ...u, role: value } : u));
  };

  return (
    <div className="p-8 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-700 border-l-4 border-indigo-400 pl-4">Users</h1>
        <p className="text-gray-400 mt-2 ml-5">Manage team members and permissions</p>
      </div>

      {/* Controls */}
      <div className="bg-white/60 backdrop-blur-md rounded-2xl p-5 mb-6 flex flex-wrap items-center gap-4 shadow-sm border border-white/50">
        <div className="relative flex-1 min-w-[250px]">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full border border-indigo-100 bg-white/80 backdrop-blur-sm text-gray-700 pl-12 pr-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-300 transition-all duration-300 hover:shadow-md"
          />
        </div>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-violet-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </span>
          <select
            value={roleFilter}
            onChange={e => setRoleFilter(e.target.value)}
            className="border border-violet-100 bg-violet-50/80 text-gray-700 pl-12 pr-8 py-3 rounded-xl appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-violet-300 transition-all duration-300 hover:shadow-md min-w-[180px]"
          >
            <option value="">All Roles</option>
            <option value="Admin">Admin</option>
            <option value="ProjectManager">Project Manager</option>
            <option value="Developer">Developer</option>
          </select>
        </div>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </span>
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="border border-emerald-100 bg-emerald-50/80 text-gray-700 pl-12 pr-8 py-3 rounded-xl appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-300 transition-all duration-300 hover:shadow-md min-w-[160px]"
          >
            <option value="">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        {role === "Admin" && (
          <button
            className="ml-auto bg-gradient-to-r from-emerald-400 to-teal-500 hover:from-emerald-500 hover:to-teal-600 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 flex items-center gap-2"
            onClick={() => alert("Open add user modal")}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add User
          </button>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white/70 backdrop-blur-md rounded-2xl shadow-sm border border-white/50">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-gradient-to-r from-indigo-50 to-purple-50">
            <tr>
              <th className="px-5 py-4 font-bold text-xs uppercase tracking-wider text-indigo-600">Name</th>
              <th className="px-5 py-4 font-bold text-xs uppercase tracking-wider text-indigo-600">Email</th>
              <th className="px-5 py-4 font-bold text-xs uppercase tracking-wider text-indigo-600">Role</th>
              <th className="px-5 py-4 font-bold text-xs uppercase tracking-wider text-indigo-600">Status</th>
              {role === "Admin" && <th className="px-5 py-4 font-bold text-xs uppercase tracking-wider text-indigo-600">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {isLoading
              ? Array.from({ length: 4 }).map((_, i) => <UserSkeleton key={i} />)
              : filteredUsers.map(user => (
                  <tr key={user.id} className="border-t border-indigo-50 hover:bg-indigo-50/50 transition-all duration-200">
                    <td className="px-5 py-4 font-semibold text-gray-700">{user.name}</td>
                    <td className="px-5 py-4 text-gray-500">{user.email}</td>
                    <td className="px-5 py-4">
                      {role === "Admin" ? (
                        <select
                          value={user.role}
                          onChange={e => handleRoleChange(user.id, e.target.value as User["role"])}
                          className="border border-indigo-100 bg-white/80 text-gray-700 px-3 py-1.5 rounded-lg text-sm focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-200"
                        >
                          <option value="Admin">Admin</option>
                          <option value="ProjectManager">Project Manager</option>
                          <option value="Developer">Developer</option>
                        </select>
                      ) : (
                        <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-violet-100 text-violet-600 border border-violet-200">
                          {user.role}
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-4">
                      {role === "Admin" ? (
                        <select
                          value={user.status}
                          onChange={e => handleStatusChange(user.id, e.target.value as "Active" | "Inactive")}
                          className="border border-indigo-100 bg-white/80 px-3 py-1.5 rounded-lg text-gray-700 text-sm focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-200"
                        >
                          <option value="Active">Active</option>
                          <option value="Inactive">Inactive</option>
                        </select>
                      ) : (
                        <span className={`${user.status === "Active" ? "bg-emerald-100 text-emerald-600 border border-emerald-200" : "bg-rose-100 text-rose-600 border border-rose-200"} px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm`}>
                          {user.status}
                        </span>
                      )}
                    </td>
                    {role === "Admin" && (
                      <td className="px-5 py-4">
                        <button
                          className="text-rose-500 hover:text-rose-600 font-semibold flex items-center gap-1 hover:bg-rose-50 px-3 py-1.5 rounded-lg transition-all duration-200"
                          onClick={() => setUsers(prev => prev.filter(u => u.id !== user.id))}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          Delete
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
