import { IssueStatus } from "../types/issue";

interface StatusBadgeProps {
  status: IssueStatus;
}

export default function StatusBadge({
  status,
}: StatusBadgeProps) {
  return (
    <span className="rounded-full bg-gray-100 px-3 py-1 text-sm">
      {status}
    </span>
  );
}