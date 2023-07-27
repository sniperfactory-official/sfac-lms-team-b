import { configureStore } from "@reduxjs/toolkit";
import classroomModalReducer from "./slice/classroomModalSlice";
import titleReducer from "./slice/lectureTitleSlice";
import contentReducer from "./slice/linkContentSlice";

export const store = configureStore({
  reducer: {
    classroomModal: classroomModalReducer,
    title: titleReducer,
    content: contentReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
