"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { deleteIssue, updateIssue } from "../store/issueSlice";
import ProtectedRoute from "../components/ProtectedRoute";
import BackButton from "../components/BackButton";
import LogoutButton from "../components/LogoutButton";
import ConfirmDialog from "../components/ConfirmDialog";
import { users } from "../data/users";
import { User } from "../types/auth";

export default function AdminPage() {
  const dispatch = useDispatch();

  const issues = useSelector(
    (state: RootState) => state.issues.issues
  );

  // Registered students
  const [students, setStudents] = useState<User[]>([]);

  // Delete confirmation
  const [showConfirm, setShowConfirm] = useState(false);
  const [issueToDelete, setIssueToDelete] = useState<string >("");

  // Issue filters
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);

  const issuesPerPage = 5;

  // Get registered students from localStorage
  useEffect(() => {
    const loadStudents = () => {
      const registeredUsers = JSON.parse(
        localStorage.getItem("users") || "[]"
      );

      const allUsers = [
        ...users,
        ...registeredUsers,
      ];

      const studentUsers = allUsers.filter(
        (user: User) => user.role === "student"
      );

      setStudents(studentUsers);
    };

    const timer = window.setTimeout(loadStudents, 0);

    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  // Issue statistics
  const pendingIssues = issues.filter(
    (issue) => issue.status === "Pending"
  );

  const initiatedIssues = issues.filter(
    (issue) => issue.status === "Initiated"
  );

  const inProgressIssues = issues.filter(
    (issue) => issue.status === "In Progress"
  );

  const resolvedIssues = issues.filter(
    (issue) => issue.status === "Resolved"
  );

  // Filter issues
  const filteredIssues = issues.filter((issue) => {
    const search = searchTerm.toLowerCase().trim();

    const reporterName =
      issue.reportedByName ||
      issue.reportedBy ||
      "";

    const matchesSearch =
      search === "" ||
      issue.title.toLowerCase().includes(search) ||
      issue.description.toLowerCase().includes(search) ||
      issue.category.toLowerCase().includes(search) ||
      issue.location.toLowerCase().includes(search) ||
      reporterName.toLowerCase().includes(search);

    const matchesCategory =
      categoryFilter === "All" ||
      issue.category === categoryFilter;

    const matchesStatus =
      statusFilter === "All" ||
      issue.status === statusFilter;

    return (
      matchesSearch &&
      matchesCategory &&
      matchesStatus
    );
  });

  // Pagination
  const totalPages = Math.ceil(
    filteredIssues.length / issuesPerPage
  );

  const startIndex =
    (currentPage - 1) * issuesPerPage;

  const paginatedIssues = filteredIssues.slice(
    startIndex,
    startIndex + issuesPerPage
  );

  // Open delete confirmation
  const handleDelete = (issueId: string) => {
    setIssueToDelete(issueId);
    setShowConfirm(true);
  };

  // Confirm delete
  const confirmDelete = () => {
    if (issueToDelete) {
      dispatch(deleteIssue(issueToDelete));
    }

    setIssueToDelete("");
    setShowConfirm(false);
  };

  // Change issue status
  const handleStatusChange = (
    issueId: string,
    nextStatus:
      | "Pending"
      | "Initiated"
      | "In Progress"
      | "Resolved"
  ) => {
    const issue = issues.find(
      (item) => item.id === issueId
    );

    if (!issue) {
      return;
    }

    dispatch(
      updateIssue({
        ...issue,
        status: nextStatus,
      })
    );
  };

  return (
    <ProtectedRoute allowedRole="admin">
      <main className="relative min-h-screen overflow-hidden p-6">

        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundColor: "#fff7ed",
            backgroundImage:
              "linear-gradient(rgba(255,247,237,0.35), rgba(255,237,213,0.3)), url('/college-bg.jpg')",
            filter:
              "brightness(1.05) contrast(1.05) saturate(1.1)",
          }}
        />

        {/* Decorative circles */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute left-10 top-32 h-48 w-48 rounded-full bg-red-200/60 blur-3xl" />

          <div className="absolute right-16 top-40 h-56 w-56 rounded-full bg-orange-200/50 blur-3xl" />

          <div className="absolute bottom-20 left-1/3 h-52 w-52 rounded-full bg-pink-200/40 blur-3xl" />
        </div>

        {/* Main content */}
        <div className="relative z-10 mx-auto max-w-7xl">

          {/* Header */}
          <div className="mb-8 rounded-2xl border border-white/50 bg-white/95 p-6 shadow-xl backdrop-blur-lg">

            <div className="flex items-center justify-between gap-4">

              {/* Back */}
              <div>
                <BackButton />
              </div>

              {/* Center */}
              <div className="text-center">
                <h1 className="bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-3xl font-black text-transparent">
                  CampusFix
                </h1>

                <p className="mt-1 text-xs font-bold uppercase tracking-widest text-slate-600">
                  Admin Dashboard
                </p>
              </div>

              {/* Logout */}
              <div>
                <LogoutButton />
              </div>

            </div>

            {/* Description */}
            <div className="mt-7">
              <h2 className="text-2xl font-bold text-slate-900">
                Control Center 🛠️
              </h2>

              <p className="mt-2 font-medium text-slate-600">
                Manage students, monitor issues, and update issue status
              </p>
            </div>

          </div>

          {/* Statistics */}
          <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">

            {/* Total */}
            <div className="rounded-xl border border-blue-200 bg-white/95 p-6 shadow-md backdrop-blur transition hover:shadow-lg">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Total Issues
              </p>

              <div className="mt-3 flex items-center justify-between">
                <p className="text-3xl font-black text-blue-600">
                  {issues.length}
                </p>

                <span className="text-4xl">
                  📋
                </span>
              </div>
            </div>

            {/* Pending */}
            <div className="rounded-xl border border-amber-200 bg-white/95 p-6 shadow-md backdrop-blur transition hover:shadow-lg">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Pending
              </p>

              <div className="mt-3 flex items-center justify-between">
                <p className="text-3xl font-black text-amber-600">
                  {pendingIssues.length}
                </p>

                <span className="text-4xl">
                  ⏳
                </span>
              </div>
            </div>

            {/* Initiated */}
            <div className="rounded-xl border border-purple-200 bg-white/95 p-6 shadow-md backdrop-blur transition hover:shadow-lg">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Initiated
              </p>

              <div className="mt-3 flex items-center justify-between">
                <p className="text-3xl font-black text-purple-600">
                  {initiatedIssues.length}
                </p>

                <span className="text-4xl">
                  🚀
                </span>
              </div>
            </div>

            {/* In Progress */}
            <div className="rounded-xl border border-cyan-200 bg-white/95 p-6 shadow-md backdrop-blur transition hover:shadow-lg">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                In Progress
              </p>

              <div className="mt-3 flex items-center justify-between">
                <p className="text-3xl font-black text-cyan-600">
                  {inProgressIssues.length}
                </p>

                <span className="text-4xl">
                  ⚙️
                </span>
              </div>
            </div>

            {/* Resolved */}
            <div className="rounded-xl border border-green-200 bg-white/95 p-6 shadow-md backdrop-blur transition hover:shadow-lg">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Resolved
              </p>

              <div className="mt-3 flex items-center justify-between">
                <p className="text-3xl font-black text-green-600">
                  {resolvedIssues.length}
                </p>

                <span className="text-4xl">
                  ✅
                </span>
              </div>
            </div>

          </div>

          {/* Registered Students */}
          <div className="mb-8 rounded-2xl border border-white/50 bg-white/95 p-8 shadow-xl backdrop-blur-lg">

            <div className="mb-6">
              <h2 className="text-2xl font-bold text-slate-900">
                Registered Students
              </h2>

              <p className="mt-1 text-sm font-medium text-slate-600">
                View students registered in CampusFix
              </p>
            </div>

            {students.length === 0 ? (

              <div className="rounded-xl border border-dashed border-slate-300 py-10 text-center">

                <div className="text-4xl">
                  👨‍🎓
                </div>

                <p className="mt-3 font-semibold text-slate-700">
                  No students registered yet.
                </p>

              </div>

            ) : (

              <div className="overflow-x-auto">

                <table className="w-full text-left">

                  <thead>
                    <tr className="border-b border-slate-200">

                      <th className="px-4 py-3 text-sm font-bold text-slate-600">
                        Name
                      </th>

                      <th className="px-4 py-3 text-sm font-bold text-slate-600">
                        Username
                      </th>

                      <th className="px-4 py-3 text-sm font-bold text-slate-600">
                        Class
                      </th>

                      <th className="px-4 py-3 text-sm font-bold text-slate-600">
                        Section
                      </th>

                      <th className="px-4 py-3 text-sm font-bold text-slate-600">
                        Registration No.
                      </th>

                      <th className="px-4 py-3 text-sm font-bold text-slate-600">
                        DOB
                      </th>

                    </tr>
                  </thead>

                  <tbody>

                    {students.map((student) => (

                      <tr
                        key={student.id}
                        className="border-b border-slate-100 transition hover:bg-slate-50"
                      >

                        <td className="px-4 py-4 font-semibold text-slate-900">
                          {student.name}
                        </td>

                        <td className="px-4 py-4 text-slate-700">
                          {student.username}
                        </td>

                        <td className="px-4 py-4 text-slate-700">
                          {student.className}
                        </td>

                        <td className="px-4 py-4 text-slate-700">
                          {student.section}
                        </td>

                        <td className="px-4 py-4 text-slate-700">
                          {student.registrationNumber || "N/A"}
                        </td>

                        <td className="px-4 py-4 text-slate-700">
                          {student.dob || "N/A"}
                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>

            )}

          </div>

          {/* All Issues */}
          <div className="rounded-2xl border border-white/50 bg-white/95 p-8 shadow-xl backdrop-blur-lg">

            {/* Heading */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-slate-900">
                All Reported Issues
              </h2>

              <p className="mt-1 text-sm font-medium text-slate-600">
                Manage every issue reported by students
              </p>
            </div>

            {/* Filters */}
            <div className="mb-8 rounded-xl border border-slate-200 bg-slate-50 p-5">

              <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-700">
                Filter Issues
              </h3>

              <div className="grid gap-4 md:grid-cols-3">

                {/* Search */}
                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
                    Search
                  </label>

                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(event) => {
                      setSearchTerm(event.target.value);
                      setCurrentPage(1);
                    }}
                    placeholder="Search issue..."
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-800 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
                    Category
                  </label>

                  <select
                    value={categoryFilter}
                    onChange={(event) => {
                      setCategoryFilter(event.target.value);
                      setCurrentPage(1);
                    }}
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                  >
                    <option value="All">
                      All Categories
                    </option>

                    <option value="Electrical">
                      Electrical
                    </option>

                    <option value="Water">
                      Water
                    </option>

                    <option value="Lab">
                      Lab
                    </option>

                    <option value="Cleanliness">
                      Cleanliness
                    </option>

                    <option value="WiFi">
                      WiFi
                    </option>

                    <option value="Classroom">
                      Classroom
                    </option>

                    <option value="Mess">
                      Mess
                    </option>

                    <option value="Other">
                      Other
                    </option>
                  </select>
                </div>

                {/* Status */}
                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
                    Status
                  </label>

                  <select
                    value={statusFilter}
                    onChange={(event) => {
                      setStatusFilter(event.target.value);
                      setCurrentPage(1);
                    }}
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                  >
                    <option value="All">
                      All Statuses
                    </option>

                    <option value="Pending">
                      Pending
                    </option>

                    <option value="Initiated">
                      Initiated
                    </option>

                    <option value="In Progress">
                      In Progress
                    </option>

                    <option value="Resolved">
                      Resolved
                    </option>
                  </select>
                </div>

              </div>

              {/* Clear Filters */}
              {(searchTerm ||
                categoryFilter !== "All" ||
                statusFilter !== "All") && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchTerm("");
                    setCategoryFilter("All");
                    setStatusFilter("All");
                    setCurrentPage(1);
                  }}
                  className="mt-4 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                >
                  Clear Filters
                </button>
              )}

            </div>

            {/* Result information */}
            {filteredIssues.length > 0 && (
              <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">

                <p className="text-sm font-semibold text-slate-600">
                  Showing{" "}
                  {startIndex + 1}-
                  {Math.min(
                    startIndex + issuesPerPage,
                    filteredIssues.length
                  )}{" "}
                  of {filteredIssues.length} issues
                </p>

                <p className="text-sm font-semibold text-slate-500">
                  Page {currentPage} of {totalPages}
                </p>

              </div>
            )}

            {/* No issues at all */}
            {issues.length === 0 ? (

              <div className="rounded-xl border border-dashed border-slate-300 py-12 text-center">

                <div className="text-5xl">
                  📭
                </div>

                <p className="mt-4 text-lg font-semibold text-slate-700">
                  No issues have been reported yet.
                </p>

              </div>

            ) : filteredIssues.length === 0 ? (

              /* No filtered results */
              <div className="rounded-xl border border-dashed border-slate-300 py-12 text-center">

                <div className="text-5xl">
                  🔍
                </div>

                <p className="mt-4 text-lg font-semibold text-slate-700">
                  No issues found.
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  Try changing your search or filters.
                </p>

              </div>

            ) : (

              <>

                {/* Issue List */}
                <div className="space-y-5">

                  {paginatedIssues.map((issue) => (

                    <div
                      key={issue.id}
                      className="rounded-xl border border-slate-200 bg-white p-6 shadow-md transition hover:border-orange-300 hover:shadow-lg"
                    >

                      {/* Issue heading */}
                      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">

                        <div className="flex-1">

                          <h3 className="text-xl font-bold text-slate-900">
                            {issue.title}
                          </h3>

                          <p className="mt-2 leading-6 text-slate-700">
                            {issue.description}
                          </p>

                        </div>

                        {/* Status */}
                        <span className="w-fit rounded-full border border-slate-300 bg-slate-100 px-4 py-2 text-xs font-bold text-slate-700">
                          {issue.status}
                        </span>

                      </div>

                      {/* Issue details */}
                      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

                        {/* Category */}
                        <div className="rounded-lg bg-slate-50 p-4">

                          <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                            Category
                          </p>

                          <p className="mt-1 font-semibold text-slate-900">
                            {issue.category}
                          </p>

                        </div>

                        {/* Location */}
                        <div className="rounded-lg bg-slate-50 p-4">

                          <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                            Location
                          </p>

                          <p className="mt-1 font-semibold text-slate-900">
                            {issue.location}
                          </p>

                        </div>

                        {/* Priority */}
                        <div className="rounded-lg bg-slate-50 p-4">

                          <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                            Priority
                          </p>

                          <p className="mt-1 font-semibold text-slate-900">
                            {issue.priority}
                          </p>

                        </div>

                        {/* Reporter */}
                        <div className="rounded-lg bg-slate-50 p-4">

                          <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                            Reporter
                          </p>

                          <p className="mt-1 font-semibold text-slate-900">
                            {issue.reportedByName ||
                              issue.reportedBy}
                          </p>

                        </div>

                      </div>

                      {/* Admin controls */}
                      <div className="mt-6 flex flex-col gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:items-center sm:justify-between">

                        {/* Change status */}
                        <div>

                          <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
                            Update Status
                          </label>

                          <select
                            value={issue.status}
                            onChange={(event) =>
                              handleStatusChange(
                                issue.id,
                                event.target.value as
                                  | "Pending"
                                  | "Initiated"
                                  | "In Progress"
                                  | "Resolved"
                              )
                            }
                            className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                          >
                            <option value="Pending">
                              Pending
                            </option>

                            <option value="Initiated">
                              Initiated
                            </option>

                            <option value="In Progress">
                              In Progress
                            </option>

                            <option value="Resolved">
                              Resolved
                            </option>
                          </select>

                        </div>

                        {/* Delete */}
                        <button
                          type="button"
                          onClick={() =>
                            handleDelete(issue.id)
                          }
                          className="rounded-lg bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
                        >
                          🗑️ Delete Issue
                        </button>

                      </div>

                    </div>

                  ))}

                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-8 flex items-center justify-center gap-4">

                    {/* Previous */}
                    <button
                      type="button"
                      disabled={currentPage === 1}
                      onClick={() =>
                        setCurrentPage(
                          (page) => page - 1
                        )
                      }
                      className="rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      ← Previous
                    </button>

                    {/* Current page */}
                    <span className="rounded-lg bg-orange-600 px-5 py-2.5 text-sm font-bold text-white">
                      {currentPage} / {totalPages}
                    </span>

                    {/* Next */}
                    <button
                      type="button"
                      disabled={currentPage === totalPages}
                      onClick={() =>
                        setCurrentPage(
                          (page) => page + 1
                        )
                      }
                      className="rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Next →
                    </button>

                  </div>
                )}

              </>

            )}

          </div>

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
            setIssueToDelete("");
          }}
        />

      </main>
    </ProtectedRoute>
  );
}