"use client";

import React, { useState } from "react";
import {
  PieChart,
  Pie,
  Sector,
  Cell,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import { Project } from "../app/utils/mockProjects";

// Transparent colors (matching your previous PieChart)
const COLORS = ["rgba(251, 191, 36, 0.9)", "rgba(59, 130, 246, 0.9)", "rgba(16, 185, 129, 0.9)"];
const STATUS = ["Pending", "In Progress", "Completed"];

interface StatusPieChartProps {
  projects: Project[];
}

const renderActiveShape = (props: any) => {
  const {
    cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value
  } = props;

  const RADIAN = Math.PI / 180;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">
        {`Count ${value}`}
      </text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
        {`(${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

const StatusPieChart: React.FC<StatusPieChartProps> = ({ projects }) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  // Count projects by status
  const statusCounts = STATUS.map((status) => ({
    name: status,
    value: projects.filter((p) => p.status === status).length,
  }));

  return (
    <div className="w-full h-64 bg-white rounded-xl shadow-md justify-center p-4 align-center ">
      <h3 className="text-md font-semibold mb-2 text-gray-700">Project Status</h3>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
  
          <Pie
            {...( { activeIndex } as any )} // cast to any to bypass TS error
            activeShape={renderActiveShape}
            data={statusCounts}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius="40%"
            outerRadius="60%"
            onMouseEnter={(_, index) => setActiveIndex(index)}
          >
            {statusCounts.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>

          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StatusPieChart;
