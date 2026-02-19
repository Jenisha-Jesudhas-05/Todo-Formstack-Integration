import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/app/store";
import { createColumn, deleteColumn, reorderColumns } from "@/features/columns/columnSlice";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TrashIcon, Bars3Icon } from "@heroicons/react/24/outline";
import {
  DndContext,
  closestCenter,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

// Sortable column component
function SortableColumn({ col, onDelete }: { col: any; onDelete: (id: string) => void }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: col.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: "grab",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="flex justify-between items-center p-2 border rounded hover:bg-muted"
    >
      <div className="flex items-center gap-2">
        <Bars3Icon className="h-5 w-5 text-gray-500" />
        <span>{col.title}</span>
      </div>
      <TrashIcon
        className="h-5 w-5 text-red-500 cursor-pointer"
        onClick={() => onDelete(col.id)}
        title="Delete state"
      />
    </div>
  );
}

export default function Settings() {
  const dispatch = useDispatch();
  const activeBoardId = useSelector(
    (state: RootState) => state.boards.activeBoardId
  );

  const columns = useSelector((state: RootState) =>
    activeBoardId ? state.columns.filter((col) => col.boardId === activeBoardId) : []
  );

  const [name, setName] = useState("");

  // Automatically create default columns when a new board is selected
  useEffect(() => {
    if (activeBoardId && columns.length === 0) {
      dispatch(createColumn({ title: "Todo", boardId: activeBoardId }));
      dispatch(createColumn({ title: "In Progress", boardId: activeBoardId }));
      dispatch(createColumn({ title: "Done", boardId: activeBoardId }));
    }
  }, [activeBoardId, columns.length, dispatch]);

  const handleCreateColumn = () => {
    if (!name.trim() || !activeBoardId) return;
    dispatch(createColumn({ title: name, boardId: activeBoardId }));
    setName("");
  };

  const handleDeleteColumn = (id: string) => {
    dispatch(deleteColumn(id));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = columns.findIndex((c) => c.id === active.id);
      const newIndex = columns.findIndex((c) => c.id === over.id);
      dispatch(reorderColumns({ oldIndex, newIndex }));
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Board States</h1>

      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={columns.map((col) => col.id)} strategy={verticalListSortingStrategy}>
          <div className="mb-4 space-y-2">
            {columns.length > 0 ? (
              columns.map((col) => (
                <SortableColumn key={col.id} col={col} onDelete={handleDeleteColumn} />
              ))
            ) : (
              <p className="text-sm text-muted-foreground">
                No states yet for this board.
              </p>
            )}
          </div>
        </SortableContext>
      </DndContext>

      <div className="flex gap-2 mt-2">
        <Input
          placeholder="New State Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleCreateColumn()}
        />
        <Button onClick={handleCreateColumn}>Create State</Button>
      </div>
    </div>
  );
}
