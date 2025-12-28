"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  Scatter,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { Project } from "../app/utils/mockProjects";

type Props = {
  projects: Project[];
};

const priorityToNumber = (priority: string) => {
  if (priority === "High") return 3;
  if (priority === "Medium") return 2;
  return 1;
};

export default function JointLineScatterChart({ projects }: Props) {
  const data = projects.map((p) => ({
    name: p.name,
    progress: p.progress,
    priority: priorityToNumber(p.priority),
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />

        <XAxis
          dataKey="name"
          tick={{ fontSize: 12 }}
          interval={0}
        />

        {/* Progress Axis */}
        <YAxis
          yAxisId="progress"
          domain={[0, 100]}
          label={{
            value: "Progress (%)",
            angle: -90,
            position: "insideLeft",
          }}
        />

        {/* Priority Axis */}
        <YAxis
          yAxisId="priority"
          orientation="right"
          domain={[1, 3]}
          ticks={[1, 2, 3]}
          tickFormatter={(v) =>
            v === 3 ? "High" : v === 2 ? "Medium" : "Low"
          }
          label={{
            value: "Priority",
            angle: 90,
            position: "insideRight",
          }}
        />

        <Tooltip />

        {/* Progress */}
        <Line
          yAxisId="progress"
          type="monotone"
          dataKey="progress"
          stroke="#3B82F6"
          strokeWidth={2}
        />
        <Scatter
          yAxisId="progress"
          dataKey="progress"
          fill="rgba(59,130,246,0.5)"
        />

        {/* Priority */}
        <Line
          yAxisId="priority"
          type="monotone"
          dataKey="priority"
          stroke="#10B981"
          strokeWidth={2}
        />
        <Scatter
          yAxisId="priority"
          dataKey="priority"
          fill="rgba(16,185,129,0.5)"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
