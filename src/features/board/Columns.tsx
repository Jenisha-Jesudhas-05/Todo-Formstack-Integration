import { Card } from "@/components/ui/card";
import { useDroppable } from "@dnd-kit/core";
import { useSortable, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import TaskCard from "./TaskCard";

interface Task {
  id: string;
  title: string;
  assignee?: string;
  deadline?: string;
  priority?: "High" | "Medium" | "Low";
}

interface ColumnProps {
  column: any;
  tasks: Task[];
  onDeleteTask?: (id: string) => void;
}

export default function Column({ column, tasks, onDeleteTask }: ColumnProps) {
  const { setNodeRef } = useDroppable({ id: column.id });

  const { attributes, listeners, setNodeRef: sortableRef, transform, transition } = useSortable({
    id: column.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  // Sort tasks by priority: High → Medium → Low
  const priorityOrder: Record<string, number> = { High: 1, Medium: 2, Low: 3 };
  const sortedTasks = [...tasks].sort(
    (a, b) => priorityOrder[a.priority || "Low"] - priorityOrder[b.priority || "Low"]
  );

  return (
    <Card
      ref={sortableRef}
      className="w-72 p-4 bg-white text-gray-900 cursor-grab rounded-xl shadow-md border border-gray-200"
      style={style}
      {...attributes}
      {...listeners}
    >
      <h3 className="font-semibold mb-4 text-lg">{column.title}</h3>

      <SortableContext items={sortedTasks.map((t) => t.id)} strategy={verticalListSortingStrategy}>
        <div
          ref={setNodeRef}
          className="space-y-3 min-h-[100px] flex flex-col items-center justify-center"
        >
          {sortedTasks.length > 0 ? (
            sortedTasks.map((task) => (
              <TaskCard key={task.id} task={task} onDelete={onDeleteTask} />
            ))
          ) : (
            <p className="text-gray-400 italic text-center">No tasks in this column</p>
          )}
        </div>
      </SortableContext>
    </Card>
  );
}
