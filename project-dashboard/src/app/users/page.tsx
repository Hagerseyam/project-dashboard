"use client";

import Users from "../../components/Users";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

export default function UsersPage() {
  const role = useSelector((state: RootState) => state.auth.role);

  return (
    <div className="p-8 min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">

      {role === "Developer" && (
        <div className="mb-6 bg-amber-50/80 backdrop-blur-sm border border-amber-100 rounded-2xl px-6 py-4 shadow-sm">
          <p className="text-amber-700 font-medium flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            You can view users but cannot make any changes.
          </p>
        </div>
      )}

      {/* Passing the props of view only*/}
      <Users {...({ viewOnly: role === "Developer" } as any)} />
    </div>
  );
}
