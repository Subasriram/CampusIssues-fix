"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

import { RootState } from "../store/store";

interface ProtectedRouteProps {
  children: React.ReactNode;

  allowedRole?: "student" | "admin";
}

export default function ProtectedRoute({
  children,
  allowedRole,
}: ProtectedRouteProps) {
  const router = useRouter();

  const user = useSelector(
    (state: RootState) => state.auth.user
  );

  const isLoggedIn = useSelector(
    (state: RootState) => state.auth.isLoggedIn
  );


  useEffect(() => {

    // User is not logged in
    if (!isLoggedIn || !user) {
      router.replace("/login");
      return;
    }


    // User is logged in but has the wrong role
    if (
      allowedRole &&
      user.role !== allowedRole
    ) {

      if (user.role === "student") {
        router.replace("/student");
      } else {
        router.replace("/admin");
      }

    }

  }, [
    isLoggedIn,
    user,
    allowedRole,
    router,
  ]);


  // Don't show protected page
  // until login check is complete
  if (!isLoggedIn || !user) {
    return null;
  }


  // Don't show page if wrong role
  if (
    allowedRole &&
    user.role !== allowedRole
  ) {
    return null;
  }


  return <>{children}</>;
}