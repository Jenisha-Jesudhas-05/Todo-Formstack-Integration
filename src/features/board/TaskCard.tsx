import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useDraggable } from "@dnd-kit/core";
import { Trash2, User } from "lucide-react"; // ✅ Lucide icons

interface TaskCardProps {
  task: {
    id: string;
    title: string;
    assignee?: string;
    deadline?: string;
    priority?: "High" | "Medium" | "Low";
  };
  onDelete?: (id: string) => void;
}

export default function TaskCard({ task, onDelete }: TaskCardProps) {
  const { setNodeRef, listeners, attributes, transform } = useDraggable({ id: task.id });

  const priorityColor: Record<string, string> = {
    High: "bg-red-600",
    Medium: "bg-yellow-500",
    Low: "bg-green-500",
  };

  const formattedDeadline = task.deadline
    ? new Date(task.deadline).toLocaleString(undefined, {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      })
    : null;

  return (
    <Card
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{
        transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined,
        touchAction: "none",
      }}
      className="p-5 mb-4 cursor-grab bg-white text-gray-900 rounded-xl shadow-md border border-gray-200"
      role="listitem"
      tabIndex={0}
    >
      {/* Task Title */}
      <h4 className="font-semibold text-gray-900 text-lg mb-2">{task.title}</h4>

      {/* Main Info */}
      <div className="flex justify-between items-start mb-3">
        {/* Left side: assignee + deadline */}
        <div>
          {task.assignee && (
            <div className="flex items-center space-x-1 text-sm font-medium text-gray-700 mb-1">
              <User className="w-4 h-4 text-gray-500" aria-hidden="true" />
              <span>{task.assignee}</span>
            </div>
          )}
          {formattedDeadline && (
            <p className="text-xs text-gray-400">{formattedDeadline}</p>
          )}
        </div>

        {/* Right side: priority + delete */}
        <div className="flex items-center space-x-2">
          {task.priority && (
            <span
              className={`text-xs px-3 py-1 rounded-full text-white select-none ${priorityColor[task.priority] || "bg-gray-400"}`}
              aria-label={`Priority: ${task.priority}`}
              title={`Priority: ${task.priority}`}
            >
              {task.priority}
            </span>
          )}

          {onDelete && (
            <Button
              onClick={() => onDelete(task.id)}
              className="p-1 rounded hover:bg-red-100 transition focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-red-400 relative z-10"
              title="Delete Task"
              aria-label="Delete Task"
              type="button"
            >
              <Trash2 className="h-5 w-5 text-red-600" />
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
