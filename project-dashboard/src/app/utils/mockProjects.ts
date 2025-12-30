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
  { id: 2, name: "Mobile App Launch", status: "Pending", priority: "Medium", assignedTo: "Developer", startDate: "2025-12-10", endDate: "2026-01-20", progress: 0, budget: 12000 },
  { id: 3, name: "Ecommerce Integration", status: "Pending", priority: "High", assignedTo: "Developer", startDate: "2025-12-12", endDate: "2026-01-22", progress: 20, budget: 15000 },
  { id: 4, name: "Personal Branding", status: "Pending", priority: "Low", assignedTo: "ProjectManager", startDate: "2025-12-15", endDate: "2026-01-25", progress: 40, budget: 4000 },
  { id: 5, name: "Pitch Deck Creation", status: "Pending", priority: "High", assignedTo: "ProjectManager", startDate: "2025-12-18", endDate: "2026-01-28", progress: 60, budget: 6000 },
  { id: 6, name: "Marketing Campaign Q4", status: "Completed", priority: "Low", assignedTo: "Admin", startDate: "2025-11-01", endDate: "2025-11-30", progress: 100, budget: 3000 },
  { id: 7, name: "Payment System Upgrade", status: "Completed", priority: "Medium", assignedTo: "Developer", startDate: "2025-11-05", endDate: "2025-11-25", progress: 100, budget: 7000 },
  { id: 8, name: "Backend Refactor", status: "In Progress", priority: "High", assignedTo: "Developer", startDate: "2025-12-05", endDate: "2025-12-25", progress: 60, budget: 8000 },
  { id: 9, name: "Frontend Optimization", status: "In Progress", priority: "High", assignedTo: "Developer", startDate: "2025-12-07", endDate: "2025-12-27", progress: 50, budget: 5500 },
  { id: 10, name: "User Onboarding Flow", status: "Pending", priority: "Medium", assignedTo: "UX Designer", startDate: "2025-12-10", endDate: "2026-01-10", progress: 0, budget: 3000 },
  { id: 11, name: "Customer Survey Analysis", status: "Completed", priority: "Low", assignedTo: "Admin", startDate: "2025-11-10", endDate: "2025-11-30", progress: 100, budget: 2000 },
  { id: 12, name: "SEO Optimization", status: "In Progress", priority: "High", assignedTo: "Developer", startDate: "2025-12-01", endDate: "2025-12-20", progress: 70, budget: 4000 },
  { id: 13, name: "Ad Campaign Q1", status: "Pending", priority: "Medium", assignedTo: "Marketing", startDate: "2025-12-12", endDate: "2026-01-12", progress: 10, budget: 6000 },
  { id: 14, name: "Brand Guidelines Update", status: "Pending", priority: "Low", assignedTo: "ProjectManager", startDate: "2025-12-15", endDate: "2026-01-15", progress: 25, budget: 3500 },
  { id: 15, name: "Social Media Strategy", status: "In Progress", priority: "Medium", assignedTo: "Marketing", startDate: "2025-12-01", endDate: "2025-12-31", progress: 55, budget: 5000 },
  { id: 16, name: "Database Migration", status: "Pending", priority: "High", assignedTo: "Developer", startDate: "2025-12-10", endDate: "2026-01-20", progress: 0, budget: 10000 },
  { id: 17, name: "Email Marketing Automation", status: "In Progress", priority: "Medium", assignedTo: "Marketing", startDate: "2025-12-05", endDate: "2025-12-25", progress: 40, budget: 4500 },
  { id: 18, name: "Product Launch Event", status: "Pending", priority: "High", assignedTo: "Admin", startDate: "2025-12-15", endDate: "2026-01-05", progress: 0, budget: 12000 },
  { id: 19, name: "Analytics Dashboard", status: "In Progress", priority: "High", assignedTo: "Developer", startDate: "2025-12-02", endDate: "2025-12-22", progress: 65, budget: 8000 },
  { id: 20, name: "Customer Support System", status: "Pending", priority: "Medium", assignedTo: "Developer", startDate: "2025-12-10", endDate: "2026-01-10", progress: 0, budget: 9000 },
  { id: 21, name: "API Development", status: "In Progress", priority: "High", assignedTo: "Developer", startDate: "2025-12-05", endDate: "2025-12-25", progress: 50, budget: 7500 },
  { id: 22, name: "Content Writing Campaign", status: "Pending", priority: "Low", assignedTo: "Marketing", startDate: "2025-12-12", endDate: "2026-01-12", progress: 15, budget: 3000 },
  { id: 23, name: "UI/UX Redesign", status: "In Progress", priority: "High", assignedTo: "UX Designer", startDate: "2025-12-01", endDate: "2025-12-31", progress: 60, budget: 7000 },
  { id: 24, name: "Security Audit", status: "Pending", priority: "High", assignedTo: "Developer", startDate: "2025-12-10", endDate: "2026-01-10", progress: 0, budget: 9000 },
  { id: 25, name: "Server Optimization", status: "In Progress", priority: "High", assignedTo: "Developer", startDate: "2025-12-03", endDate: "2025-12-23", progress: 70, budget: 8500 },
  { id: 26, name: "Mobile App Redesign", status: "Pending", priority: "Medium", assignedTo: "UX Designer", startDate: "2025-12-15", endDate: "2026-01-15", progress: 0, budget: 6000 },
  { id: 27, name: "Internal Training Portal", status: "In Progress", priority: "Medium", assignedTo: "ProjectManager", startDate: "2025-12-01", endDate: "2025-12-20", progress: 45, budget: 4000 },
  { id: 28, name: "HR Management System", status: "Pending", priority: "Medium", assignedTo: "Admin", startDate: "2025-12-12", endDate: "2026-01-12", progress: 0, budget: 5000 },
  { id: 29, name: "DevOps Pipeline Setup", status: "In Progress", priority: "High", assignedTo: "Developer", startDate: "2025-12-05", endDate: "2025-12-25", progress: 55, budget: 9500 },
  { id: 30, name: "Customer Feedback Tool", status: "Pending", priority: "Low", assignedTo: "ProjectManager", startDate: "2025-12-10", endDate: "2026-01-10", progress: 0, budget: 3500 },
  { id: 31, name: "Website Localization", status: "In Progress", priority: "Medium", assignedTo: "Developer", startDate: "2025-12-02", endDate: "2025-12-22", progress: 50, budget: 4000 },
  { id: 32, name: "Video Marketing Campaign", status: "Pending", priority: "Medium", assignedTo: "Marketing", startDate: "2025-12-12", endDate: "2026-01-12", progress: 10, budget: 6000 },
  { id: 33, name: "Blog Content Creation", status: "In Progress", priority: "Low", assignedTo: "Marketing", startDate: "2025-12-01", endDate: "2025-12-21", progress: 55, budget: 2500 },
  { id: 34, name: "Affiliate Program Setup", status: "Pending", priority: "Medium", assignedTo: "Admin", startDate: "2025-12-10", endDate: "2026-01-10", progress: 0, budget: 5000 },
  { id: 35, name: "Cloud Migration", status: "In Progress", priority: "High", assignedTo: "Developer", startDate: "2025-12-03", endDate: "2025-12-23", progress: 65, budget: 12000 },
  { id: 36, name: "Performance Testing", status: "Pending", priority: "High", assignedTo: "Developer", startDate: "2025-12-12", endDate: "2026-01-12", progress: 0, budget: 8000 },
  { id: 37, name: "CRM Integration", status: "In Progress", priority: "Medium", assignedTo: "Developer", startDate: "2025-12-05", endDate: "2025-12-25", progress: 60, budget: 7000 },
  { id: 38, name: "Competitor Analysis Report", status: "Pending", priority: "Low", assignedTo: "ProjectManager", startDate: "2025-12-10", endDate: "2026-01-10", progress: 0, budget: 2000 },
  { id: 39, name: "Press Release Draft", status: "In Progress", priority: "Low", assignedTo: "Marketing", startDate: "2025-12-01", endDate: "2025-12-21", progress: 50, budget: 1500 },
  { id: 40, name: "Newsletter Automation", status: "Pending", priority: "Medium", assignedTo: "Marketing", startDate: "2025-12-10", endDate: "2026-01-10", progress: 0, budget: 2500 },
  { id: 41, name: "Internal Wiki Update", status: "In Progress", priority: "Low", assignedTo: "Admin", startDate: "2025-12-03", endDate: "2025-12-23", progress: 55, budget: 1000 },
  { id: 42, name: "Bug Fix Sprint", status: "In Progress", priority: "High", assignedTo: "Developer", startDate: "2025-12-05", endDate: "2025-12-25", progress: 70, budget: 4500 },
  { id: 43, name: "Server Backup Setup", status: "Pending", priority: "Medium", assignedTo: "Admin", startDate: "2025-12-12", endDate: "2026-01-12", progress: 0, budget: 3500 },
  { id: 44, name: "Customer Loyalty Program", status: "Pending", priority: "Medium", assignedTo: "Marketing", startDate: "2025-12-10", endDate: "2026-01-10", progress: 0, budget: 6000 },
  { id: 45, name: "Project Documentation", status: "In Progress", priority: "Low", assignedTo: "ProjectManager", startDate: "2025-12-01", endDate: "2025-12-21", progress: 60, budget: 3000 }
];
