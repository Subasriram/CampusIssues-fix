"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

import { RootState } from "../store/store";
import ProtectedRoute from "../components/ProtectedRoute";

export default function DashboardPage() {
  const router = useRouter();

  const user = useSelector(
    (state: RootState) => state.auth.user
  );


  useEffect(() => {

    if (!user) {
      return;
    }


    if (user.role === "student") {
      router.replace("/student");
    }

    if (user.role === "admin") {
      router.replace("/admin");
    }

  }, [user, router]);


  return (
    <ProtectedRoute>
      <div className="flex min-h-screen items-center justify-center bg-slate-100">
        <p className="text-lg font-semibold text-slate-700">
          Loading dashboard...
        </p>
      </div>
    </ProtectedRoute>
  );
}