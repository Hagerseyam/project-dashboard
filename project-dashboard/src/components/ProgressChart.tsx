"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Project } from "../app/utils/mockProjects";

type Props = {
  projects: Project[];
};

export default function ProjectProgressChart({ projects }: Props) {
  // Transform projects for chart
  const data = projects.map((p) => ({
    name: p.name,
    progress: p.progress,
  }));

  return (
    <div className="w-full h-74 bg-white p-7 rounded-xl shadow-md">
      <h3 className="text-lg font-semibold mb-2 text-gray-700">Project Progress</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip />
          <Bar dataKey="progress">
            {data.map((entry, index) => {
              let fillColor = "rgba(251, 191, 36, 0.4)"; // yellow default
              if (entry.progress >= 80) fillColor = "rgba(16, 185, 129, 0.4)"; // green
              else if (entry.progress >= 50) fillColor = "rgba(59, 130, 246, 0.4)"; // blue
              return <Cell key={`cell-${index}`} fill={fillColor} />;
            })}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
