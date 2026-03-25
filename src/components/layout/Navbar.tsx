import { useState } from "react";
import { Button } from "@/components/ui/button";
import CreateTaskModal from "@/features/modals/CreateTaskModal";

export default function Navbar() {
  const [taskOpen, setTaskOpen] = useState(false);

  return (
    <div className="h-16 border-b border-gray-200 dark:border-gray-800 px-6 flex items-center justify-between bg-white dark:bg-gray-900 dark:text-white">
      <h1 className="text-xl font-semibold">Planora</h1>

      <div className="flex items-center space-x-2">
        <Button
          className="bg-black text-white hover:bg-gray-900 dark:bg-black dark:hover:bg-gray-800 px-4 py-2 rounded-lg shadow-sm transition"
          onClick={() => setTaskOpen(true)}
        >
          Create Task
        </Button>
      </div>
      {taskOpen && <CreateTaskModal onClose={() => setTaskOpen(false)} />}
    </div>
  );
}
