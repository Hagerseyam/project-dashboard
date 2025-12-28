"use client";

import Users from "../../components/Users"; // keep your users.tsx in components
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

export default function UsersPage() {
  const role = useSelector((state: RootState) => state.auth.role);

  return (
    <div className="p-6">

      {role === "Developer" && (
        <p className="mb-4 text-gray-700">
          You can view users but cannot make any changes.
        </p>
      )}

      {/* Pass props if you want view-only mode */}
      <Users {...({ viewOnly: role === "Developer" } as any)} />
    </div>
  );
}
