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

const data = [
  { subject: "Pending", value: 30 },
  { subject: "In Progress", value: 50 },
  { subject: "Completed", value: 20 },
];

const COLORS = ["#FBBF24", "#3B82F6", "#10B981"];

const RadarChartExample: React.FC = () => {
  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer>
        <RadarChart data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <PolarRadiusAxis domain={[0, 60]} />

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
