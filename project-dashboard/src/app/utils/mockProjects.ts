export type Project = {
  id: number;
  name: string;
  status: "Pending" | "In Progress" | "Completed" | string;
  priority: "High" | "Medium" | "Low" | string;
  assignedTo: string; // username or role
  startDate: string;
  endDate: string;
  progress: number;
  budget: number;
};


export const mockProjects: Project[] = [
  { id: 1, name: "Website Redesign", status: "In Progress", priority: "High", assignedTo: "Developer", startDate: "2025-12-01", endDate: "2025-12-31", progress: 45, budget: 5000 },
  { id: 2, name: "Redesign", status: "In Progress", priority: "High", assignedTo: "Developer", startDate: "2025-12-01", endDate: "2025-12-31", progress: 45, budget: 5000 },
  { id: 3, name: "Mobile App", status: "Pending", priority: "Medium", assignedTo: "Developer", startDate: "2025-12-10", endDate: "2026-01-20", progress: 0, budget: 12000 },
  { id: 4, name: "Ecommerce ", status: "Pending", priority: "High", assignedTo: "Developer", startDate: "2025-12-10", endDate: "2026-01-20", progress: 80, budget: 12000 },
  { id: 5, name: "Personal branding", status: "Pending", priority: "Low", assignedTo: "ProjectManager", startDate: "2025-12-10", endDate: "2026-01-20", progress: 40, budget: 12000 },
  { id: 6, name: "pitch deck ", status: "Pending", priority: "High", assignedTo: "ProjectManager", startDate: "2025-12-10", endDate: "2026-01-20", progress: 60, budget: 12000 },
  { id: 7, name: "Marketing Campaign", status: "Completed", priority: "Low", assignedTo: "Admin", startDate: "2025-11-01", endDate: "2025-11-30", progress: 100, budget: 3000 },
  { id: 8, name: "Payment Campaign", status: "Completed", priority: "Low", assignedTo: "Developer", startDate: "2025-11-01", endDate: "2025-11-30", progress: 100, budget: 3000 },
  { id: 9, name: "Systems", status: "In Progress", priority: "High", assignedTo: "Developer", startDate: "2025-12-05", endDate: "2025-12-25", progress: 90, budget: 8000 },
  { id: 10, name: "Backend Refactor", status: "In Progress", priority: "High", assignedTo: "Developer", startDate: "2025-12-05", endDate: "2025-12-25", progress: 60, budget: 8000 },
];
