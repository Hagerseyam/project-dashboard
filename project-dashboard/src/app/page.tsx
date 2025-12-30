"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { logout } from "../redux/authSlice";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/16/solid";


export default function Home() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [hydrated, setHydrated] = useState(false);

  // Get login state from Redux
  const isLoggedIn = useSelector((state: RootState) => !!state.auth.token);
  const [userName, setUserName] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

const handleLogout = async () => {
  try {
    await fetch("/api/logout", {
      method: "POST",
    });

    dispatch(logout());

    toast.success("Logged out successfully");
    router.push("/login");
  } catch (error) {
    toast.error("Logout failed");
  }
};


  if (!hydrated) return null;


  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-white">
      {/* Sidebar */}
<div className="relative md:block">
        <div className="md:hidden flex items-center justify-between bg-white/80 backdrop-blur-md p-4 shadow-sm border-b border-white/50">
          <h2 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Dashboard</h2>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-xl hover:bg-indigo-50 transition-all duration-300"
          >
            {isOpen ? (
              <XMarkIcon className="w-6 h-6 text-indigo-600" />
            ) : (
              <Bars3Icon className="w-6 h-6 text-indigo-600" />
            )}
          </button>
        </div>

        <aside
          className={`bg-white/80 backdrop-blur-xl shadow-xl border-r border-white/50 p-6 md:block absolute md:relative top-0 left-0 h-full md:h-full w-72 transition-transform duration-300 ease-out transform ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 z-50`}
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Dashboard</h2>
          </div>
          <nav className="flex flex-col gap-2">
            <Link
              href="/analytics"
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 transition-all duration-300 text-gray-600 hover:text-indigo-600 font-medium group"
              onClick={() => setIsOpen(false)}
            >
              <span className="w-8 h-8 bg-blue-50 group-hover:bg-blue-100 rounded-lg flex items-center justify-center transition-colors">
                <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </span>
              Analytics
            </Link>
            <Link
              href="/projects"
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 transition-all duration-300 text-gray-600 hover:text-indigo-600 font-medium group"
              onClick={() => setIsOpen(false)}
            >
              <span className="w-8 h-8 bg-emerald-50 group-hover:bg-emerald-100 rounded-lg flex items-center justify-center transition-colors">
                <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                </svg>
              </span>
              Projects
            </Link>
            <Link
              href="/users"
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 transition-all duration-300 text-gray-600 hover:text-indigo-600 font-medium group"
              onClick={() => setIsOpen(false)}
            >
              <span className="w-8 h-8 bg-violet-50 group-hover:bg-violet-100 rounded-lg flex items-center justify-center transition-colors">
                <svg className="w-4 h-4 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </span>
              Users
            </Link>
          </nav>
        </aside>

        {isOpen && (
          <div
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm md:hidden z-40"
          />
        )}
      </div>
      {/* Main content */}
      <main className="flex-1 flex flex-col items-center justify-center text-center p-8 md:p-16 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-pink-200/20 rounded-full blur-3xl"></div>

        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
            Welcome to Project Dashboard
          </h1>
          <p className="mt-6 text-lg md:text-xl text-gray-500 max-w-2xl leading-relaxed">
            Your central hub to manage projects, track progress, and keep your team aligned. 
            Stay organized and productive with ease.
          </p>

          {/* Conditional button */}
          {!isLoggedIn ? (
            <button
              onClick={() => router.push("/login")}
              className="mt-10 px-10 py-4 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold text-lg hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1"
            >
              Get Started
            </button>
          ) : (
            <div className="mt-10 flex flex-col items-center gap-4">
              <div className="bg-white/60 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/50 shadow-sm">
                <p className="text-gray-600 font-medium">Welcome back, <span className="text-indigo-600 font-semibold">{userName}</span></p>
              </div>
              <button
                onClick={handleLogout}
                className="px-8 py-3 rounded-xl bg-gradient-to-r from-rose-400 to-pink-500 text-white font-semibold text-lg hover:from-rose-500 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                Sign Out
              </button>
            </div>
          )}

          {/* Accent info boxes */}
          <div className="mt-12 flex flex-wrap justify-center gap-6">
            <div className="bg-emerald-50/80 backdrop-blur-sm border border-emerald-100 px-8 py-6 rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl mx-auto mb-3 flex items-center justify-center group-hover:bg-emerald-200 transition-colors">
                <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-emerald-600/80 font-semibold text-sm uppercase tracking-wide">Active Projects</p>
              <p className="text-3xl font-bold text-gray-700 mt-1">12</p>
            </div>
            <div className="bg-amber-50/80 backdrop-blur-sm border border-amber-100 px-8 py-6 rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-12 h-12 bg-amber-100 rounded-xl mx-auto mb-3 flex items-center justify-center group-hover:bg-amber-200 transition-colors">
                <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-amber-600/80 font-semibold text-sm uppercase tracking-wide">Pending Tasks</p>
              <p className="text-3xl font-bold text-gray-700 mt-1">7</p>
            </div>
            <div className="bg-violet-50/80 backdrop-blur-sm border border-violet-100 px-8 py-6 rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-12 h-12 bg-violet-100 rounded-xl mx-auto mb-3 flex items-center justify-center group-hover:bg-violet-200 transition-colors">
                <svg className="w-6 h-6 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <p className="text-violet-600/80 font-semibold text-sm uppercase tracking-wide">Team Members</p>
              <p className="text-3xl font-bold text-gray-700 mt-1">5</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
