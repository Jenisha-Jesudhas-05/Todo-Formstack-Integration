import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useDispatch, useSelector } from "react-redux";
import { createTask } from "@/features/tasks/taskSlice";
import type { RootState } from "@/app/store";

interface CreateTaskModalProps {
  onClose: () => void;
}

export default function CreateTaskModal({ onClose }: CreateTaskModalProps) {
  const dispatch = useDispatch();
  const columns = useSelector(
    (state: RootState) => state.columns as Array<{ id: string; title: string }>
  );

  const [form, setForm] = useState({
    title: "",
    description: "",
    deadline: "",
    priority: "Low" as "Low" | "Medium" | "High",
    assignee: "",
    columnId: "",
  });

  const submit = () => {
    if (!form.title || !form.columnId || !form.priority) return;

    dispatch(
      createTask({
        title: form.title,
        description: form.description,
        deadline: form.deadline,
        assignee: form.assignee,
        columnId: form.columnId,
        priority: form.priority,
      })
    );

    onClose();
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="space-y-3 w-96 bg-white text-gray-900 rounded-xl p-6 shadow-lg">
        <Input
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <Textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <Input
          type="datetime-local"
          value={form.deadline}
          onChange={(e) => setForm({ ...form, deadline: e.target.value })}
        />
        <Input
          placeholder="Assignee"
          value={form.assignee}
          onChange={(e) => setForm({ ...form, assignee: e.target.value })}
        />

        <select
          className="border p-2 rounded w-full bg-white text-gray-900"
          value={form.columnId || ""}
          onChange={(e) => setForm({ ...form, columnId: e.target.value })}
        >
          <option value="" disabled>
            Select Column
          </option>
          {columns.map((col) => (
            <option key={col.id} value={col.id}>
              {col.title}
            </option>
          ))}
        </select>

        <select
          className="border p-2 rounded w-full bg-white text-gray-900"
          value={form.priority}
          onChange={(e) =>
            setForm({
              ...form,
              priority: e.target.value as "Low" | "Medium" | "High",
            })
          }
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        <Button className="w-full mt-2 bg-black hover:bg-gray-900 text-white" onClick={submit}>
          Create Task
        </Button>
      </DialogContent>
    </Dialog>
  );
}
