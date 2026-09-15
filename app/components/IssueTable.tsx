"use client";

import { Issue } from "../types/issue";
import Button from "./Button";

interface IssueTableProps {
  issues: Issue[];
  onDelete: (id: string) => void;
  onEdit: (issue: Issue) => void;
}

export default function IssueTable({
  issues,
  onDelete,
  onEdit,
}: IssueTableProps) {
  const handleStatusChange = (issue: Issue, newStatus: string) => {
    onEdit({
      ...issue,
      status: newStatus as "Pending" | "In Progress" | "Resolved",
    });
  };
  return (
    <div className="overflow-x-auto rounded bg-white shadow">
      <table className="w-full">
        <thead>
          <tr className="border-b bg-gray-100 text-left">
            <th className="p-3">Title</th>
            <th className="p-3">Category</th>
            <th className="p-3">Priority</th>
            <th className="p-3">Status</th>
            <th className="p-3">Action</th>
          </tr>
        </thead>

        <tbody>
          {issues.map((issue) => (
            <tr key={issue.id} className="border-b">
              <td className="p-3">{issue.title}</td>
              <td className="p-3">{issue.category}</td>
              <td className="p-3">{issue.priority}</td>
              <td className="p-3">
                <select
                  value={issue.status}
                  onChange={(e) =>
                    handleStatusChange(issue, e.target.value)
                  }
                  className="rounded border border-gray-300 px-2 py-1 text-sm"
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                </select>
              </td>

              <td className="p-3">
                <Button onClick={() => onDelete(issue.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}