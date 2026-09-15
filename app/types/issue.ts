export type Category =
  | "Electrical"
  | "Water"
  | "Lab"
  | "Cleanliness"
  | "WiFi"
  | "Classroom"
  | "Mess"
  | "Other";

export type Priority =
  | "Low"
  | "Medium"
  | "High";

export type Status =
  | "Pending"
  | "Initiated"
  | "In Progress"
  | "Resolved";

export type IssueStatus = Status;

export interface Issue {
  id: string;

  title: string;
  description: string;

  category: Category;
  location: string;
  priority: Priority;
  status: Status;

  reportedBy: string;

  reportedByUserId?: string;
  reportedByName?: string;
  reportedByClass?: string;

  createdAt: string;
}