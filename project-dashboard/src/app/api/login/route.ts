import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { username, password } = await req.json();

  const users = [
    { username: "admin1", password: "123", role: "Admin", name: "Admin User" },
    { username: "manager1", password: "123", role: "ProjectManager", name: "PM User" },
    { username: "dev1", password: "123", role: "Developer", name: "Dev User" },
  ];

  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) {
    return NextResponse.json(
      { error: "Invalid credentials" },
      { status: 401 }
    );
  }

  const res = NextResponse.json({
    token: `${user.username}-token`,
    role: user.role,
    name: user.name,
  });

  const maxAge = 60 * 60 * 24 * 7;

  res.cookies.set("token", `${user.username}-token`, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge,
  });

  res.cookies.set("role", user.role, {
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge,
  });

  res.cookies.set("name", user.name, {
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge,
  });

  return res;
}
