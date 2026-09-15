"use client";

import IssueForm from "../components/IssueForm";

export default function NewIssuePage() {
  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-xl">
        <h1 className="mb-6 text-3xl font-bold text-blue-600">Report New Issue</h1>
        <IssueForm />
      </div>
    </main>
  );
}
