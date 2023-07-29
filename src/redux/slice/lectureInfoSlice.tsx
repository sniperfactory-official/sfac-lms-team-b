import { createSlice } from "@reduxjs/toolkit";
interface LectureInfoState {
  lectureTitle: string;
  lectureContent: string;
  selectedModal: string | null;
  dateRange: [Date | null, Date | null];
  lecturePublic: boolean;
}

const initialState: LectureInfoState = {
  lectureTitle: "",
  lectureContent: "",
  selectedModal: null,
  dateRange: [null, null],
  lecturePublic: false,
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
    setDateRange: (state, action) => {
      state.dateRange = action.payload;
    },
    setStartDate: (state, action) => {
      state.dateRange[0] = action.payload;
    },
    setEndDate: (state, action) => {
      state.dateRange[1] = action.payload;
    },
    setLecturePublic: (state, action) => {
      state.lecturePublic = action.payload;
    },
    resetInput: () => initialState,
  },
});

export const {
  setLectureTitle,
  setLectureContent,
  setSelectedModal,
  setDateRange,
  setStartDate,
  setEndDate,
  setLecturePublic,
  resetInput,
} = LectureInfoSlice.actions;
export default LectureInfoSlice.reducer;
