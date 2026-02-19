import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";
import type { Task } from "../types";


const taskSlice = createSlice({
  name: "tasks",
  initialState: [] as Task[],
  reducers: {
    createTask: (state, action: PayloadAction<Omit<Task, "id">>) => {
      state.push({ id: uuid(), ...action.payload });
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      const index = state.findIndex(t => t.id === action.payload.id);
      if (index !== -1) state[index] = action.payload;
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      return state.filter(t => t.id !== action.payload);
    },
    moveTask: (state, action: PayloadAction<{ taskId: string; columnId: string }>) => {
      const task = state.find(t => t.id === action.payload.taskId);
      if (task) task.columnId = action.payload.columnId;
    },
  },
});

export const { createTask, updateTask, deleteTask, moveTask } = taskSlice.actions;
export default taskSlice.reducer;
