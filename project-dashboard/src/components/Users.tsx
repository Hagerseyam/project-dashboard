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

export default function UsersPage() {
  const role = useSelector((state: RootState) => state.auth.role);
  const [users, setUsers] = useState<User[]>([]);
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
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-blue-700 mb-4">Users</h1>

      {/* Controls */}
      <div className="flex flex-wrap gap-3 mb-4">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="border px-3 py-2 rounded-md w-64"
        />
        <select
          value={roleFilter}
          onChange={e => setRoleFilter(e.target.value)}
          className="border px-3 py-2 rounded-md"
        >
          <option value="">All Roles</option>
          <option value="Admin">Admin</option>
          <option value="ProjectManager">Project Manager</option>
          <option value="Developer">Developer</option>
        </select>
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="border px-3 py-2 rounded-md"
        >
          <option value="">All Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>

        {role === "Admin" && (
          <button
            className="ml-auto bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md shadow-md transition"
            onClick={() => alert("Open add user modal")}
          >
            Add User
          </button>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-md border border-gray-200">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Status</th>
              {role === "Admin" && <th className="px-4 py-3">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {isLoading
              ? Array.from({ length: 4 }).map((_, i) => <UserSkeleton key={i} />)
              : filteredUsers.map(user => (
                  <tr key={user.id} className="border-t hover:bg-gray-50 transition">
                    <td className="px-4 py-3 font-medium text-gray-800">{user.name}</td>
                    <td className="px-4 py-3 text-gray-700">{user.email}</td>
                    <td className="px-4 py-3">
                      {role === "Admin" ? (
                        <select
                          value={user.role}
                          onChange={e => handleRoleChange(user.id, e.target.value as User["role"])}
                          className="border px-2 py-1 rounded text-sm"
                        >
                          <option value="Admin">Admin</option>
                          <option value="ProjectManager">Project Manager</option>
                          <option value="Developer">Developer</option>
                        </select>
                      ) : (
                        user.role
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {role === "Admin" ? (
                        <select
                          value={user.status}
                          onChange={e => handleStatusChange(user.id, e.target.value as "Active" | "Inactive")}
                          className="border px-2 py-1 rounded text-sm"
                        >
                          <option value="Active">Active</option>
                          <option value="Inactive">Inactive</option>
                        </select>
                      ) : (
                        <span className={`${user.status === "Active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"} px-2 py-1 rounded-full text-xs font-medium`}>
                          {user.status}
                        </span>
                      )}
                    </td>
                    {role === "Admin" && (
                      <td className="px-4 py-3">
                        <button
                          className="text-red-500 hover:text-red-700 font-medium"
                          onClick={() => setUsers(prev => prev.filter(u => u.id !== user.id))}
                        >
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
