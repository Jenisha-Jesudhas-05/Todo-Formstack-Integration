import { Card } from "@/components/ui/card";
import { useDroppable } from "@dnd-kit/core";
import { useSortable, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import TaskCard from "./TaskCard";

interface ColumnProps {
  column: any;
  tasks: any[];
}

export default function Column({ column, tasks }: ColumnProps) {
  // Droppable for tasks inside this column
  const { setNodeRef } = useDroppable({ id: column.id });

  // Make the column itself sortable
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
    (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
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

      {/* Tasks inside column */}
      <SortableContext items={sortedTasks.map((t) => t.id)} strategy={verticalListSortingStrategy}>
        <div ref={setNodeRef} className="space-y-3">
          {sortedTasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      </SortableContext>
    </Card>
  );
}
