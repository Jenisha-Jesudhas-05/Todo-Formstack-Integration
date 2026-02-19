import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";
import type { Column } from "../types";

interface ColumnState extends Column {}

const initialState: ColumnState[] = [];

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

    // Create default columns for a new board
    createDefaultColumns: (
      state,
      action: PayloadAction<{ boardId: string }>
    ) => {
      const { boardId } = action.payload;
      state.push(
        { id: uuid(), title: "Todo", boardId },
        { id: uuid(), title: "In Progress", boardId },
        { id: uuid(), title: "Done", boardId }
      );
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

export const { createColumn, deleteColumn, reorderColumns, createDefaultColumns } =
  columnSlice.actions;
export default columnSlice.reducer;
