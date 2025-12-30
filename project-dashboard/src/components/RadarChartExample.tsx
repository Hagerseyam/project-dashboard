"use client";

import React from "react";
import {
  RadarChart,
  Radar,
  PolarAngleAxis,
  PolarRadiusAxis,
  Legend,
  PolarGrid,
  ResponsiveContainer,
} from "recharts";
import { Project } from "../app/utils/mockProjects"; // adjust path

interface RadarChartExampleProps {
  projects: Project[];
}

const RadarChartExample: React.FC<RadarChartExampleProps> = ({ projects }) => {
  // Convert projects data to the format for the radar chart
  const data = [
    {
      subject: "Pending",
      value: projects.filter(p => p.status === "Pending").length,
    },
    {
      subject: "In Progress",
      value: projects.filter(p => p.status === "In Progress").length,
    },
    {
      subject: "Completed",
      value: projects.filter(p => p.status === "Completed").length,
    },
  ];

  const COLORS = ["#FBBF24", "#3B82F6", "#10B981"];

  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer height={250}>
        <RadarChart data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <PolarRadiusAxis domain={[0, Math.max(...data.map(d => d.value)) + 5]} />

          {data.map((entry, index) => (
            <Radar
              key={entry.subject}
              name={entry.subject}
              dataKey="value"
              stroke={COLORS[index]}
              fill={COLORS[index]}
              fillOpacity={0.35}
            />
          ))}

          <Legend />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RadarChartExample;
