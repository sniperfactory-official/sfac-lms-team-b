import { configureStore } from "@reduxjs/toolkit";
import classroomModalReducer from "./slice/classroomModalSlice";

export const store = configureStore({
  reducer: {
    classroomModal: classroomModalReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
