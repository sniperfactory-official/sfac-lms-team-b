import { createSlice } from "@reduxjs/toolkit";
import { Timestamp } from "firebase/firestore";

interface LectureInfoState {
  lectureTitle: string;
  lectureContent: string;
  selectedModal: string | null;
  startDate: Timestamp | null;
  endDate: Timestamp | null;
  isLecturePublic: boolean;
}

const initialState: LectureInfoState = {
  lectureTitle: "",
  lectureContent: "",
  selectedModal: null,
  startDate: null,
  endDate: null,
  isLecturePublic: false,
};
const LectureInfoSlice = createSlice({
  name: "lectureInfo",
  initialState,
  reducers: {
    setLectureTitle: (state, action) => {
      state.lectureTitle = action.payload;
    },
    setLectureContent: (state, action) => {
      state.lectureContent = action.payload;
    },
    setSelectedModal: (state, action) => {
      state.selectedModal = action.payload;
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
  setLectureTitle,
  setLectureContent,
  setSelectedModal,
  setStartDate,
  setEndDate,
  setIsLecturePublic,
  resetInput,
} = LectureInfoSlice.actions;
export default LectureInfoSlice.reducer;
