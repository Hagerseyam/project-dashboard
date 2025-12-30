"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDispatch } from "react-redux";
import { login, logout } from "../../redux/authSlice";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
  role: z.enum(["Admin", "ProjectManager", "Developer"], "Role is required"),
});



type LoginFormInputs = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const mockUsers: { username: string; password: string; role: LoginFormInputs["role"] }[] = [
    { username: "admin1", password: "123", role: "Admin" },
    { username: "manager1", password: "123", role: "ProjectManager" },
    { username: "dev1", password: "123", role: "Developer" },
  ];
const onSubmit = async (data: LoginFormInputs) => {
  // Call your API login endpoint
  const res = await fetch("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: data.username,
      password: data.password,
    }),
  });

  const json = await res.json();

  if (!res.ok) {
    toast.error(json.error);
    return;
  }

  // Dispatch to Redux
  dispatch(
    login({
      token: json.token,
      name: json.name,
      role: json.role,
    })
  );

  toast.success(`Welcome, ${json.name}!`);
  router.push("/dashboard");
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-purple-200/40 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-200/40 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-200/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>

      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl w-[420px] p-10 border border-white/60 relative z-10 hover:shadow-2xl transition-all duration-500">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-700 mb-2">Welcome Back</h1>
          <p className="text-gray-400 text-sm">Login to access your dashboard</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          {/* Username */}
          <div className="flex flex-col">
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </span>
              <input
                {...register("username")}
                placeholder="Username"
                className="w-full border border-indigo-100 bg-white/60 backdrop-blur-sm rounded-xl pl-12 pr-4 py-3.5 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-200 transition-all duration-300 hover:shadow-md"
              />
            </div>
            {errors.username && <p className="text-rose-500 text-xs mt-2 ml-1">{errors.username.message}</p>}
          </div>

          {/* Password */}
          <div className="flex flex-col">
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </span>
              <input
                {...register("password")}
                placeholder="Password"
                type="password"
                className="w-full border border-indigo-100 bg-white/60 backdrop-blur-sm rounded-xl pl-12 pr-4 py-3.5 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-200 transition-all duration-300 hover:shadow-md"
              />
            </div>
            {errors.password && <p className="text-rose-500 text-xs mt-2 ml-1">{errors.password.message}</p>}
          </div>

          {/* Role */}
          <div className="flex flex-col">
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </span>
              <select
                {...register("role")}
                defaultValue=""
                className="w-full border border-indigo-100 bg-white/60 backdrop-blur-sm rounded-xl pl-12 pr-4 py-3.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-200 transition-all duration-300 hover:shadow-md cursor-pointer appearance-none"
              >
                <option value="" disabled>Select Role</option>
                <option value="Admin">Admin</option>
                <option value="ProjectManager">Project Manager</option>
                <option value="Developer">Developer</option>
              </select>
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-indigo-400 pointer-events-none">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </div>
            {errors.role && <p className="text-rose-500 text-xs mt-2 ml-1">{errors.role.message}</p>}
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-semibold py-4 rounded-xl transition-all duration-300 mt-3 shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
          >
            Sign In
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-gray-400 text-xs">
            Demo credentials: <span className="text-indigo-500 font-medium">admin1 / 123</span>
          </p>
        </div>

      </div>
    </div>
  );
}
