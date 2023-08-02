import { createSlice } from "@reduxjs/toolkit";
import { Timestamp } from "firebase/firestore";

interface LectureInfoState {
  courseId: string;
  lectureType: string;
  lectureTitle: string;
  textContent: string;
  noteImages: string[];
  startDate: Timestamp | null;
  endDate: Timestamp | null;
  isLecturePrivate: boolean;
}

const initialState: LectureInfoState = {
  courseId: "",
  lectureType: "",
  lectureTitle: "",
  textContent: "",
  noteImages: [],
  startDate: null,
  endDate: null,
  isLecturePrivate: true,
};

const LectureInfoSlice = createSlice({
  name: "lectureInfo",
  initialState,
  reducers: {
    setCourseId: (state, action) => {
      state.courseId = action.payload;
    },
    setLectureType: (state, action) => {
      state.lectureType = action.payload;
    },
    setLectureTitle: (state, action) => {
      state.lectureTitle = action.payload;
    },
    setTextContent: (state, action) => {
      state.textContent = action.payload;
    },
    setNoteImages: (state, action) => {
      state.noteImages.push(action.payload);
    },
    setStartDate: (state, action) => {
      state.startDate = action.payload;
    },
    setEndDate: (state, action) => {
      state.endDate = action.payload;
    },
    setIsLecturePrivate: (state, action) => {
      state.isLecturePrivate = action.payload;
    },
    resetInput: state => {
      const { courseId } = state;
      initialState;
      state.courseId = courseId;
    },
  },
});

export const {
  setCourseId,
  setLectureType,
  setLectureTitle,
  setTextContent,
  setNoteImages,
  setStartDate,
  setEndDate,
  setIsLecturePrivate,
  resetInput,
} = LectureInfoSlice.actions;
export default LectureInfoSlice.reducer;
