import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { v4 as uuid } from "uuid";
import type { Board } from "../types";

interface BoardState {
  boards: Board[];
  activeBoardId: string | null;
}

// ✅ Add default board to match initial columns
const initialState: BoardState = {
  boards: [{ id: "default", name: "Default Board" }],
  activeBoardId: "default",
};

const boardSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {
    // Create a new board
    createBoard: (state, action: PayloadAction<string>) => {
      const newBoard: Board = { id: uuid(), name: action.payload };
      state.boards.push(newBoard);
      state.activeBoardId = newBoard.id; // make newly created board active
    },

    // Set active board
    setActiveBoard: (state, action: PayloadAction<string>) => {
      state.activeBoardId = action.payload;
    },

    // Delete a board
    deleteBoard: (state, action: PayloadAction<string>) => {
      state.boards = state.boards.filter((b) => b.id !== action.payload);
      if (state.activeBoardId === action.payload) {
        state.activeBoardId = null; // reset active board if deleted
      }
    },
  },
});

// ✅ Export actions including deleteBoard
export const { createBoard, setActiveBoard, deleteBoard } = boardSlice.actions;
export default boardSlice.reducer;
