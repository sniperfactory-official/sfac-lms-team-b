import { createSlice } from "@reduxjs/toolkit";
interface LectureInfoState {
  courseId: string;
  lectureTitle: string;
  lectureContent: string;
  noteImages: File | null;
  selectedModal: string | null;
  dateRange: [Date | null, Date | null];
  isLecturePublic: boolean;
}

const initialState: LectureInfoState = {
  courseId: "",
  lectureTitle: "",
  lectureContent: "",
  noteImages: null,
  selectedModal: null,
  dateRange: [null, null],
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
    setSelectedModal: (state, action) => {
      state.selectedModal = action.payload;
    },
    setDateRange: (state, action) => {
      state.dateRange = action.payload;
    },
    setStartDate: (state, action) => {
      state.dateRange[0] = action.payload;
    },
    setEndDate: (state, action) => {
      state.dateRange[1] = action.payload;
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
  setSelectedModal,
  setDateRange,
  setStartDate,
  setEndDate,
  setIsLecturePublic,
  resetInput,
} = LectureInfoSlice.actions;
export default LectureInfoSlice.reducer;
