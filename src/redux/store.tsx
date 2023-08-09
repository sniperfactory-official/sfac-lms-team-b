import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import postSlice from "./slice/postSlice";
import type { TypedUseSelectorHook } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import storageSession from "redux-persist/lib/storage/session";
import { persistReducer, persistStore } from "redux-persist";
import classroomModalReducer from "./slice/classroomModalSlice";
import lectureInfoSliceReducer from "./slice/lectureInfoSlice";
import dropzoneFileReducer from "./slice/dropzoneFileSlice";
import editCourseReducer from "./slice/editCourseIdSlice";

const persistConfig = {
  key: "root",
  storage: storageSession,
};
const persistedReducer = persistReducer(persistConfig, userSlice);

export const store = configureStore({
  reducer: {
    userInfo: persistedReducer,
    postInfo: postSlice,
    classroomModal: classroomModalReducer,
    lectureInfo: lectureInfoSliceReducer,
    dropzoneFile: dropzoneFileReducer,
    editCourse: editCourseReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ serializableCheck: false }),
  devTools: process.env.NODE_ENV !== "production",
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;