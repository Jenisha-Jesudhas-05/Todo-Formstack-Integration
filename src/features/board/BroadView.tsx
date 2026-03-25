import { useBoard } from "@/context/BoardContext";

export default function BoardView() {
  const { tasks } = useBoard();

  return (
    <div className="p-6 space-y-3" />
  );
}
