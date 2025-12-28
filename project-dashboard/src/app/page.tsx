"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { logout } from "../redux/authSlice";

export default function Home() {
  const router = useRouter();
  const dispatch = useDispatch();

  // Get login state from Redux
  const isLoggedIn = useSelector((state: RootState) => !!state.auth.token);
  const userName = useSelector((state: RootState) => state.auth.name);

  const handleSignOut = () => {
    dispatch(logout());
    router.push("/"); // stay on same page
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-white">
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

      {/* Main content */}
      <main className="flex-1 flex flex-col items-center justify-center text-center p-8 md:p-16 bg-gradient-to-br from-blue-50 via-white to-green-50">
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900">
          Welcome to Project Dashboard
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-700 max-w-2xl">
          Your central hub to manage projects, track progress, and keep your team aligned. 
          Stay organized and productive with ease.
        </p>

        {/* Conditional button */}
        {!isLoggedIn ? (
          <button
            onClick={() => router.push("/login")}
            className="mt-8 px-8 py-3 rounded-lg bg-blue-500/80 text-white font-semibold text-lg hover:bg-blue-600/90 transition-colors shadow-lg"
          >
            Login
          </button>
        ) : (
          <div className="mt-8 flex flex-col items-center gap-2">
            <p className="text-gray-700 font-medium">Hello, {userName}</p>
            <button
              onClick={handleSignOut}
              className="px-8 py-3 rounded-lg bg-red-500/80 text-white font-semibold text-lg hover:bg-red-600/90 transition-colors shadow-lg"
            >
              Sign Out
            </button>
          </div>
        )}

        {/* Accent info boxes */}
        <div className="mt-10 flex flex-wrap justify-center gap-6">
          <div className="bg-green-50 border border-green-200 px-6 py-4 rounded-lg shadow-md">
            <p className="text-green-800 font-semibold">Active Projects</p>
            <p className="text-2xl font-bold text-green-900">12</p>
          </div>
          <div className="bg-orange-50 border border-orange-200 px-6 py-4 rounded-lg shadow-md">
            <p className="text-orange-800 font-semibold">Pending Tasks</p>
            <p className="text-2xl font-bold text-orange-900">7</p>
          </div>
          <div className="bg-blue-50 border border-blue-200 px-6 py-4 rounded-lg shadow-md">
            <p className="text-blue-800 font-semibold">Team Members</p>
            <p className="text-2xl font-bold text-blue-900">5</p>
          </div>
        </div>
      </main>
    </div>
  );
}
