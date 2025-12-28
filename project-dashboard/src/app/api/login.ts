import type { NextApiRequest, NextApiResponse } from "next";

type Data = { token: string; role: string; name: string } | { error: string };

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { username, password } = req.body;

  if (username === "admin" && password === "123") {
    return res.status(200).json({ token: "fake-jwt-token", role: "Admin", name: "Admin User" });
  }
  if (username === "pm" && password === "123") {
    return res.status(200).json({ token: "fake-jwt-token", role: "ProjectManager", name: "PM User" });
  }
  if (username === "dev" && password === "123") {
    return res.status(200).json({ token: "fake-jwt-token", role: "Developer", name: "Dev User" });
  }

  return res.status(401).json({ error: "Invalid credentials" });
}
