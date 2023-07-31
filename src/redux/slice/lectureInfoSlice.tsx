import { createSlice } from "@reduxjs/toolkit";
import { Timestamp } from "firebase/firestore";

interface LectureInfoState {
  courseId: string;
  lectureType: string;
  lectureTitle: string;
  lectureContent: string;
  selectedModal: string | null;
  startDate: Timestamp | null;
  endDate: Timestamp | null;
  noteImages: File | null;
  isLecturePublic: boolean;
}

const initialState: LectureInfoState = {
  courseId: "",
  lectureType: "",
  lectureTitle: "",
  lectureContent: "",
  selectedModal: null,
  startDate: null,
  endDate: null,
  noteImages: null,
  isLecturePublic: false,
};

const LectureInfoSlice = createSlice({
  name: "lectureInfo",
  initialState,
  reducers: {
    setCourseId: (state, action) => {
      state.courseId = action.payload;
    },
    setLectureTitle: (state, action) => {
      state.lectureTitle = action.payload;
    },
    setLectureContent: (state, action) => {
      state.lectureContent = action.payload;
    },
    setNoteImages: (state, action) => {
      state.noteImages = action.payload;
    },
    setLectureType: (state, action) => {
      state.lectureType = action.payload;
    },
    setStartDate: (state, action) => {
      state.startDate = action.payload;
    },

    setEndDate: (state, action) => {
      state.endDate = action.payload;
    },
    setIsLecturePublic: (state, action) => {
      state.isLecturePublic = action.payload;
    },
    resetInput: () => initialState,
  },
});

export const {
  setCourseId,
  setLectureTitle,
  setLectureContent,
  setLectureType,
  setStartDate,
  setEndDate,
  setIsLecturePublic,
  resetInput,
} = LectureInfoSlice.actions;
export default LectureInfoSlice.reducer;
