export interface Board {
  id: string;
  name: string;
}

export interface Column {
  id: string;
  title: string;
  boardId: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  deadline: string;
  priority: "Low" | "Medium" | "High";
  assignee: string;
  columnId: string;
}
export type Priority = "Low" | "Medium" | "High";