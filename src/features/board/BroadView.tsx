import { DndContext, closestCenter, type DragEndEvent } from "@dnd-kit/core";
import {
  SortableContext,
  horizontalListSortingStrategy,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/app/store";
import { moveTask } from "@/features/tasks/taskSlice";
import { reorderColumns } from "@/features/columns/columnSlice";
import Column from "./Columns";

export default function BoardView() {
  const dispatch = useDispatch();
  const columns = useSelector((state: RootState) => state.columns);
  const tasks = useSelector((state: RootState) => state.tasks);

  // Handle drag end for both tasks and columns
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    // Check if dragging a task
    const task = tasks.find((t) => t.id === active.id);
    if (task) {
      dispatch(moveTask({ taskId: task.id, columnId: String(over.id) }));
      return;
    }

    // Otherwise, it's a column
    const oldIndex = columns.findIndex((c) => c.id === active.id);
    const newIndex = columns.findIndex((c) => c.id === over.id);
    if (oldIndex !== -1 && newIndex !== -1) {
      dispatch(reorderColumns({ oldIndex, newIndex }));
    }
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      {/* Columns sortable horizontally */}
      <SortableContext
        items={columns.map((col) => col.id)}
        strategy={horizontalListSortingStrategy}
      >
        <div className="flex gap-6 p-6">
          {columns.map((col) => (
            // Each column renders its tasks with SortableContext vertically
            <SortableContext
              key={col.id}
              items={tasks.filter((t) => t.columnId === col.id).map((t) => t.id)}
              strategy={verticalListSortingStrategy}
            >
              <Column
                column={col}
                tasks={tasks.filter((t) => t.columnId === col.id)}
              />
            </SortableContext>
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
