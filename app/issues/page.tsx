"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

import { RootState } from "../store/store";
import { addIssue } from "../store/issueSlice";

import Navbar from "../components/Navbar";
import IssueForm from "../components/IssueForm";
import ProtectedRoute from "../components/ProtectedRoute";
import Toast from "../components/Toast";

import { IssueFormData } from "../schemas/issuesSchema";
import { Issue } from "../types/issue";

export default function IssuesPage() {
  const dispatch = useDispatch();
  const router = useRouter();

  const user = useSelector(
    (state: RootState) => state.auth.user
  );

  const [toast, setToast] = useState<string | null>(null);

  const handleSubmit = (data: IssueFormData) => {
    if (!user) return;

    const newIssue: Issue = {
      id: `ISS-${Date.now()}`,

      title: data.title,

      description: data.description,

      category:
        data.category as Issue["category"],

      location: data.location,

      priority:
        data.priority as Issue["priority"],

      status: "Pending",

      reportedBy:
        user.name || user.username,

      reportedByUserId: user.id,

      reportedByName:
        user.name || user.username,

      reportedByClass:
        user.className || "",

      createdAt:
        new Date().toISOString(),
    };

    // Add issue to Redux
    dispatch(addIssue(newIssue));

    // Show toast
    setToast("Submitted successfully!");

    // Automatically hide toast after 3 seconds
    setTimeout(() => {
      setToast(null);
    }, 3000);

    // Go back to student dashboard
    setTimeout(() => {
      router.push("/student");
    }, 1500);
  };

  return (
    <ProtectedRoute>

      <Navbar />

      {/* Toast */}
      {toast && (
        <Toast
          message={toast}
          onClose={() => setToast(null)}
        />
      )}

      <main className="min-h-screen bg-gray-100 p-6">

        <div className="mx-auto max-w-xl">

          <h1 className="mb-6 text-3xl font-bold">
            Report New Issue
          </h1>

          <IssueForm
            onSubmit={handleSubmit}
          />

        </div>

      </main>

    </ProtectedRoute>
  );
}