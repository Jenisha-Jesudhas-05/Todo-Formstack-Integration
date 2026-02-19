import { useState } from "react";
import { Button } from "@/components/ui/button";
import Settings from "@/pages/Settings";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import CreateTaskModal from "@/features/modals/CreateTaskModal";

export default function Navbar() {
  const [taskOpen, setTaskOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <div className="h-16 border-b border-gray-200 dark:border-gray-800 px-6 flex items-center justify-between bg-white dark:bg-gray-900 dark:text-white">
      <h1 className="text-xl font-semibold">Planora</h1>

      <div className="flex items-center space-x-2">
        {/* Create Task button with modal */}
        <Dialog open={taskOpen} onOpenChange={setTaskOpen}>
          <DialogTrigger asChild>
            <Button className="bg-black text-white hover:bg-gray-900 dark:bg-black dark:hover:bg-gray-800 px-4 py-2 rounded-lg shadow-sm transition">
                Create Task
            </Button>

          </DialogTrigger>
          <DialogContent className="w-96 bg-white dark:bg-gray-800 dark:text-white">
            <CreateTaskModal onClose={() => setTaskOpen(false)} />
          </DialogContent>
        </Dialog>

        {/* Settings button with modal */}
        <Dialog open={settingsOpen} onOpenChange={setSettingsOpen}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="p-2 border-gray-300 text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700"
            >
              <Cog6ToothIcon className="h-5 w-5" />
            </Button>
          </DialogTrigger>
          <DialogContent className="w-96 bg-white dark:bg-gray-800 dark:text-white">
            <Settings />
          </DialogContent>
        </Dialog>
        
      </div>
    </div>
  );
}
