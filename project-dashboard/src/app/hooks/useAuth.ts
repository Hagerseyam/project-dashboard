// src/app/hooks/useAuth.ts
"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useRouter } from "next/navigation";

export function useAuth(allowedRoles: string[]) {
  const role = useSelector((state: RootState) => state.auth.role);
  const router = useRouter();

  useEffect(() => {
    if (!role || !allowedRoles.includes(role)) {
      router.push("/login");
    }
  }, [role, allowedRoles, router]);

  return role;
}
