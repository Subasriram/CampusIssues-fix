"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ConfirmDialog from "../components/ConfirmDialog";
import { RootState } from "../store/store";
import {
  deleteIssue,
  updateIssue,
} from "../store/issueSlice";

import ProtectedRoute from "../components/ProtectedRoute";
import BackButton from "../components/BackButton";
import LogoutButton from "../components/LogoutButton";
import IssueForm from "../components/IssueForm";
import Button from "../components/Button";

import { Issue } from "../types/issue";
import { IssueFormData } from "../schemas/issuesSchema";

export default function StudentPage() {
  const dispatch = useDispatch();

  const user = useSelector(
    (state: RootState) => state.auth.user
  );

  const issues = useSelector(
    (state: RootState) => state.issues.issues
  );

  // Delete confirmation
  const [showConfirm, setShowConfirm] = useState(false);

  const [issueToDelete, setIssueToDelete] =
    useState<Issue | null>(null);

  const [showIssueForm, setShowIssueForm] =
    useState(false);

  const [editingIssue, setEditingIssue] =
    useState<Issue | null>(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 10;

  if (!user) {
    return null;
  }

  // Show only issues created by this student
  const myIssues = issues.filter(
    (issue) =>
      issue.reportedByUserId === user.id
  );

  // Pagination calculations
  const totalPages = Math.ceil(
    myIssues.length / ITEMS_PER_PAGE
  );

  const startIndex =
    (currentPage - 1) * ITEMS_PER_PAGE;

  const currentIssues = myIssues.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  // If current page becomes empty after deleting
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (
      totalPages > 0 &&
      currentPage > totalPages
    ) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const pendingCount = myIssues.filter(
    (issue) => issue.status === "Pending"
  ).length;

  const initiatedCount = myIssues.filter(
    (issue) => issue.status === "Initiated"
  ).length;

  const inProgressCount = myIssues.filter(
    (issue) => issue.status === "In Progress"
  ).length;

  const resolvedCount = myIssues.filter(
    (issue) => issue.status === "Resolved"
  ).length;

  // Edit issue
  const handleEdit = (issue: Issue) => {
    setEditingIssue(issue);
    setShowIssueForm(true);
  };

  // Open delete confirmation
  const handleDelete = (issue: Issue) => {
    // Extra safety check
    if (
      issue.reportedByUserId !== user.id
    ) {
      return;
    }

    setIssueToDelete(issue);
    setShowConfirm(true);
  };

  // Confirm delete
  const confirmDelete = () => {
    if (issueToDelete) {
      dispatch(deleteIssue(issueToDelete.id));
    }

    setIssueToDelete(null);
    setShowConfirm(false);
  };

  // Close form
  const handleCloseForm = () => {
    setShowIssueForm(false);
    setEditingIssue(null);
  };

  // Update issue
  const handleUpdate = (
    data: IssueFormData
  ) => {
    if (!editingIssue) {
      return;
    }

    dispatch(
      updateIssue({
        ...editingIssue,
        ...data,
        category:
          data.category as Issue["category"],
        priority:
          data.priority as Issue["priority"],
      })
    );

    handleCloseForm();
  };

  return (
    <ProtectedRoute allowedRole="student">
      <main className="min-h-screen bg-slate-100">

        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

            <div>
              <h1 className="text-2xl font-black text-slate-900">
                Student Dashboard
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Welcome back, {user.name}
              </p>
            </div>

            <div className="flex gap-3">
              <BackButton />
              <LogoutButton />
            </div>

          </div>
        </header>

        <div className="mx-auto max-w-7xl px-6 py-8">

          {/* Student Information */}
          <div className="mb-8 rounded-2xl bg-white p-6 shadow-lg">

            <div className="mb-5">
              <h2 className="text-xl font-bold text-slate-900">
                Student Information
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Your registered account details
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

              <div className="rounded-xl bg-blue-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
                  Name
                </p>

                <p className="mt-1 font-bold text-slate-900">
                  {user.name}
                </p>
              </div>

              <div className="rounded-xl bg-purple-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-purple-600">
                  Class
                </p>

                <p className="mt-1 font-bold text-slate-900">
                  {user.className}
                </p>
              </div>

              <div className="rounded-xl bg-green-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-green-600">
                  Section
                </p>

                <p className="mt-1 font-bold text-slate-900">
                  {user.section}
                </p>
              </div>

              <div className="rounded-xl bg-orange-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-orange-600">
                  Registration Number
                </p>

                <p className="mt-1 font-bold text-slate-900">
                  {user.registrationNumber || "-"}
                </p>
              </div>

            </div>
          </div>

          {/* Statistics */}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

            <div className="rounded-2xl bg-white p-6 shadow-lg">
              <p className="text-sm font-semibold text-slate-500">
                Pending
              </p>

              <p className="mt-2 text-4xl font-black text-yellow-500">
                {pendingCount}
              </p>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-lg">
              <p className="text-sm font-semibold text-slate-500">
                Initiated
              </p>

              <p className="mt-2 text-4xl font-black text-blue-500">
                {initiatedCount}
              </p>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-lg">
              <p className="text-sm font-semibold text-slate-500">
                In Progress
              </p>

              <p className="mt-2 text-4xl font-black text-purple-500">
                {inProgressCount}
              </p>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-lg">
              <p className="text-sm font-semibold text-slate-500">
                Resolved
              </p>

              <p className="mt-2 text-4xl font-black text-green-500">
                {resolvedCount}
              </p>
            </div>

          </div>

          {/* My Issues Header */}
          <div className="mt-8 flex items-center justify-between">

            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                My Issues
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Issues reported by you
              </p>
            </div>

            <Button
              onClick={() => {
                setEditingIssue(null);
                setShowIssueForm(true);
              }}
            >
              + Report New Issue
            </Button>

          </div>

          {/* Issue Form */}
          {showIssueForm && (
            <div className="mt-6 rounded-2xl bg-white p-6 shadow-lg">

              <IssueForm
                initialData={
                  editingIssue || undefined
                }
                submitLabel={
                  editingIssue
                    ? "Update Issue"
                    : "Submit Issue"
                }
                onSubmit={
                  editingIssue
                    ? handleUpdate
                    : undefined
                }
              />

              <div className="mt-4">
                <Button
                  variant="secondary"
                  onClick={handleCloseForm}
                >
                  Cancel
                </Button>
              </div>

            </div>
          )}

          {/* Issues */}
          <div className="mt-6 space-y-5">

            {myIssues.length === 0 ? (

              <div className="rounded-2xl bg-white p-10 text-center shadow-lg">

                <div className="text-5xl">
                  📋
                </div>

                <h3 className="mt-4 text-xl font-bold text-slate-900">
                  No issues reported
                </h3>

                <p className="mt-2 text-slate-500">
                  You haven&apos;t reported any campus issues yet.
                </p>

              </div>

            ) : (

              currentIssues.map((issue) => (

                <div
                  key={issue.id}
                  className="rounded-2xl bg-white p-6 shadow-lg"
                >

                  {/* Issue Heading */}
                  <div className="flex flex-col justify-between gap-4 md:flex-row">

                    <div>
                      <h3 className="text-xl font-bold text-slate-900">
                        {issue.title}
                      </h3>

                      <p className="mt-2 text-slate-600">
                        {issue.description}
                      </p>
                    </div>

                    {/* Status */}
                    <span className="h-fit rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">
                      {issue.status}
                    </span>

                  </div>

                  {/* Details */}
                  <div className="mt-5 grid gap-3 border-t pt-4 text-sm sm:grid-cols-2 lg:grid-cols-4">

                    <div>
                      <span className="font-semibold text-slate-500">
                        Category
                      </span>

                      <p className="font-medium text-slate-900">
                        {issue.category}
                      </p>
                    </div>

                    <div>
                      <span className="font-semibold text-slate-500">
                        Location
                      </span>

                      <p className="font-medium text-slate-900">
                        {issue.location}
                      </p>
                    </div>

                    <div>
                      <span className="font-semibold text-slate-500">
                        Priority
                      </span>

                      <p className="font-medium text-slate-900">
                        {issue.priority}
                      </p>
                    </div>

                    <div>
                      <span className="font-semibold text-slate-500">
                        Reported On
                      </span>

                      <p className="font-medium text-slate-900">
                        {new Date(
                          issue.createdAt
                        ).toLocaleDateString()}
                      </p>
                    </div>

                  </div>

                  {/* Student Controls */}
                  <div className="mt-5 flex flex-wrap gap-3 border-t border-slate-200 pt-5">

                    <Button
                      variant="secondary"
                      onClick={() =>
                        handleEdit(issue)
                      }
                    >
                      ✏️ Edit
                    </Button>

                    <Button
                      variant="danger"
                      onClick={() =>
                        handleDelete(issue)
                      }
                    >
                      🗑️ Delete
                    </Button>

                  </div>

                </div>

              ))

            )}

          </div>

          {/* Pagination */}
          {myIssues.length > ITEMS_PER_PAGE && (
            <div className="mt-8 flex flex-wrap items-center justify-center gap-2">

              {/* Previous */}
              <button
                type="button"
                onClick={() =>
                  setCurrentPage((page) =>
                    Math.max(page - 1, 1)
                  )
                }
                disabled={currentPage === 1}
                className="rounded-lg border border-slate-300 bg-white px-4 py-2 font-semibold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
              >
                ← Previous
              </button>

              {/* Page Numbers */}
              {Array.from(
                { length: totalPages },
                (_, index) => index + 1
              ).map((page) => (
                <button
                  key={page}
                  type="button"
                  onClick={() =>
                    setCurrentPage(page)
                  }
                  className={`rounded-lg px-4 py-2 font-semibold transition ${
                    currentPage === page
                      ? "bg-blue-600 text-white"
                      : "border border-slate-300 bg-white text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  {page}
                </button>
              ))}

              {/* Next */}
              <button
                type="button"
                onClick={() =>
                  setCurrentPage((page) =>
                    Math.min(
                      page + 1,
                      totalPages
                    )
                  )
                }
                disabled={
                  currentPage === totalPages
                }
                className="rounded-lg border border-slate-300 bg-white px-4 py-2 font-semibold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Next →
              </button>

            </div>
          )}

        </div>

        {/* Delete Confirmation Dialog */}
        <ConfirmDialog
          open={showConfirm}
          title="Confirm Delete"
          message="Are you sure you want to delete this issue?"
          confirmText="Delete"
          onConfirm={confirmDelete}
          onCancel={() => {
            setShowConfirm(false);
            setIssueToDelete(null);
          }}
        />

      </main>
    </ProtectedRoute>
  );
}