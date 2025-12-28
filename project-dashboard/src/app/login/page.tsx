"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDispatch } from "react-redux";
import { login } from "../../redux/authSlice";
import { useRouter } from "next/navigation";

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

  // Mock users
  const mockUsers = [
    { username: "admin1", password: "123", role: "Admin" },
    { username: "manager1", password: "123", role: "ProjectManager" },
    { username: "dev1", password: "123", role: "Developer" },
  ];

  const onSubmit = (data: LoginFormInputs) => {
    const user = mockUsers.find(
      u => u.username === data.username && u.password === data.password
    );

    if (!user) return alert("Invalid username or password");

    dispatch(
      login({ token: "mock-token", name: user.username, role: user.role as LoginFormInputs["role"] })
    );

    // Redirect everyone to main page
    router.push("/"); 
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-6 bg-white shadow rounded w-80 flex flex-col gap-3"
      >
        <input
          {...register("username")}
          placeholder="Username"
          className="border p-2 text-black placeholder-black/50"
        />
        {errors.username && <p className="text-red-500">{errors.username.message}</p>}

        <input
          {...register("password")}
          placeholder="Password"
          type="password"
          className="border p-2 text-black placeholder-black/50"
        />
        {errors.password && <p className="text-red-500">{errors.password.message}</p>}

        <select
          {...register("role")}
          className="border p-2 text-black"
          defaultValue=""
        >
          <option value="" disabled>Select Role</option>
          <option value="Admin">Admin</option>
          <option value="ProjectManager">Project Manager</option>
          <option value="Developer">Developer</option>
        </select>
        {errors.role && <p className="text-red-500">{errors.role.message}</p>}

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 mt-2 hover:bg-blue-600 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
}
