"use client";

import ProjectTable from "@/components/ProjectTable";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

export default function ProjectsPage() {

      const role = useSelector((state: RootState) => state.auth.role);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Projects</h1>

    
     {role === "Developer" ? (
            <p className="mb-4 text-gray-700">
              You can view the projects but cannot make any changes.
            </p>
          ) : null}
    
          <ProjectTable {...({ viewOnly: role === "Developer" } as any)} />
    
    
    </div>
  );
}
