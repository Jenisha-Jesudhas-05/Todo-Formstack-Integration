import { combineReducers, configureStore } from "@reduxjs/toolkit";
import boardReducer from "@/features/boards/boardSlice";
import columnReducer from "@/features/columns/columnSlice";
import taskReducer from "@/features/tasks/taskSlice";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // localStorage

// Persist config for each slice (or combine)
const persistConfig = {
  key: "root",      // key in localStorage
  storage,          // use localStorage
  whitelist: ["boards", "columns", "tasks"], // slices to persist
};

const rootReducer = {
  boards: boardReducer,
  columns: columnReducer,
  tasks: taskReducer,
};

const persistedReducer = persistReducer(persistConfig, combineReducers(rootReducer));

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;