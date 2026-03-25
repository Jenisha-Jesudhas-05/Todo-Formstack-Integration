import { createContext, useContext, useReducer, type ReactNode } from "react";
import { v4 as uuid } from "uuid";
import type { Task } from "@/features/types";

type State = { tasks: Task[] };

type Action =
  | { type: "CREATE_TASK"; payload: Omit<Task, "id"> }
  | { type: "MOVE_TASK"; payload: { taskId: string; columnId: string } };

const initialState: State = { tasks: [] };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "CREATE_TASK": {
      const newTask: Task = { id: uuid(), ...action.payload };
      return { ...state, tasks: [...state.tasks, newTask] };
    }
    case "MOVE_TASK": {
      const { taskId, columnId } = action.payload;
      return {
        ...state,
        tasks: state.tasks.map((t) =>
          t.id === taskId
            ? {
                ...t,
                columnId,
              }
            : t
        ),
      };
    }
    default:
      return state;
  }
}

type BoardContextValue = State & {
  createTask: (task: Omit<Task, "id">) => void;
  moveTask: (taskId: string, columnId: string) => void;
};

const BoardContext = createContext<BoardContextValue | null>(null);

export function BoardProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value: BoardContextValue = {
    ...state,
    createTask: (task) => dispatch({ type: "CREATE_TASK", payload: task }),
    moveTask: (taskId, columnId) =>
      dispatch({ type: "MOVE_TASK", payload: { taskId, columnId } }),
  };

  return <BoardContext.Provider value={value}>{children}</BoardContext.Provider>;
}

export function useBoard() {
  const ctx = useContext(BoardContext);
  if (!ctx) throw new Error("useBoard must be used within BoardProvider");
  return ctx;
}
