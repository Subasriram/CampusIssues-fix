"use client";

import { Issue } from "../types/issue";
import StatusBadge from "./StatusBadge";
import Button from "./Button";

interface IssueCardProps {
  issue: Issue;
  canEdit?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function IssueCard({
  issue,
  canEdit = false,
  onEdit,
  onDelete,
}: IssueCardProps) {
  return (
    <div className="rounded-lg bg-white p-5 shadow">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold">{issue.title}</h2>
        <StatusBadge status={issue.status} />
      </div>

      <p className="mt-2 text-gray-600">
        {issue.description}
      </p>

      <div className="mt-3 space-y-1 text-sm">
        <p>Category: {issue.category}</p>
        <p>Location: {issue.location}</p>
        <p>Priority: {issue.priority}</p>
        <p>Reported by: {issue.reportedBy}</p>
      </div>

      {canEdit && (
        <div className="mt-4 flex gap-2">
          <Button onClick={onEdit}>Edit</Button>

          <button
            onClick={onDelete}
            className="rounded bg-red-500 px-4 py-2 text-white"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}