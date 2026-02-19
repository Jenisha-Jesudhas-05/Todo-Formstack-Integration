import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/app/store";
import { createBoard, setActiveBoard, deleteBoard } from "@/features/boards/boardSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TrashIcon } from "@heroicons/react/24/outline";

export default function Sidebar() {
  const dispatch = useDispatch();
  const boards = useSelector((state: RootState) => state.boards.boards);
  const activeBoardId = useSelector(
    (state: RootState) => state.boards.activeBoardId
  );

  const [collapsed, setCollapsed] = useState(true);
  const [newBoardName, setNewBoardName] = useState("");

  // Create board handler
  const handleCreateBoard = () => {
    if (!newBoardName.trim()) return;
    dispatch(createBoard(newBoardName));
    setNewBoardName("");
    setCollapsed(false); // keep dropdown open
  };

  // Delete board handler
  const handleDeleteBoard = (boardId: string) => {
    dispatch(deleteBoard(boardId));
  };

  return (
    <div className="w-64 border-r p-4">
      {/* Boards heading */}
      <div
        className="flex justify-between items-center cursor-pointer mb-2"
        onClick={() => setCollapsed(!collapsed)}
      >
        <h2 className="font-semibold text-lg">Boards</h2>
        <span>{collapsed ? "+" : "-"}</span>
      </div>

      {/* Collapsible board list */}
      {!collapsed && (
        <div className="space-y-2">
          {boards.length > 0 ? (
            boards.map((board) => (
              <div
                key={board.id}
                className={`flex justify-between items-center p-2 rounded cursor-pointer hover:bg-muted ${
                  board.id === activeBoardId ? "bg-blue-100 font-medium" : ""
                }`}
              >
                <span
                  className="flex-1"
                  onClick={() => dispatch(setActiveBoard(board.id))}
                >
                  {board.name}
                </span>
                {/* Delete icon */}
                <TrashIcon
                  className="h-4 w-4 text-red-500 cursor-pointer ml-2"
                  onClick={() => handleDeleteBoard(board.id)}
                />
              </div>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">No boards yet</p>
          )}

          {/* Divider + create board */}
          <div className="pt-2 border-t mt-2 space-y-2">
            <Input
              placeholder="New Board Name"
              value={newBoardName}
              onChange={(e) => setNewBoardName(e.target.value)}
            />
            <Button
              size="sm"
              className="w-full"
              onClick={handleCreateBoard}
            >
              Create Board
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
