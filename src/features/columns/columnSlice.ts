import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { v4 as uuid } from "uuid";
import type { Column } from "../types";

interface ColumnState extends Column {
  // additional fields can go here if needed
}

const initialState: ColumnState[] = [
  { id: "todo", title: "Todo", boardId: "default" },
  { id: "inprogress", title: "In Progress", boardId: "default" },
  { id: "done", title: "Done", boardId: "default" },
];

const columnSlice = createSlice({
  name: "columns",
  initialState,
  reducers: {
    // Create a new column (state)
    createColumn: (
      state,
      action: PayloadAction<{ title: string; boardId: string }>
    ) => {
      state.push({
        id: uuid(),
        title: action.payload.title,
        boardId: action.payload.boardId,
      });
    },

    // Delete a column by id
    deleteColumn: (state, action: PayloadAction<string>) => {
      const index = state.findIndex((col) => col.id === action.payload);
      if (index !== -1) state.splice(index, 1);
    },

    // Reorder columns (drag & drop)
    reorderColumns: (
      state,
      action: PayloadAction<{ oldIndex: number; newIndex: number }>
    ) => {
      const { oldIndex, newIndex } = action.payload;

      // Safety checks
      if (
        oldIndex < 0 ||
        newIndex < 0 ||
        oldIndex >= state.length ||
        newIndex >= state.length ||
        oldIndex === newIndex
      )
        return;

      const [moved] = state.splice(oldIndex, 1);
      state.splice(newIndex, 0, moved);
    },
  },
});

export const { createColumn, deleteColumn, reorderColumns } = columnSlice.actions;
export default columnSlice.reducer;
