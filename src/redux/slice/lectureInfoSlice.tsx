import { createSlice } from "@reduxjs/toolkit";
import type { Timestamp } from "firebase/firestore";

/**
 * Firebase Firestore Timestamp를 일반 날짜 문자열로 변환하는 함수
 * @param {Timestamp} firebaseTimestamp - Firebase Firestore에서 제공하는 Timestamp 객체
 * @returns {string} - "yyyy.MM.dd" 형식의 일반 날짜 문자열
 */
const timestampToDate = (firebaseTimestamp: Timestamp): string => {
  const timestampInMillis =
    firebaseTimestamp.seconds * 1000 + firebaseTimestamp.nanoseconds / 1000000;

  const date = new Date(timestampInMillis);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}.${month}.${day}`;
};
interface LectureInfoState {
  lectureTitle: string;
  lectureContent: string;
  selectedModal: string | null;
  prevModal: string | null;
  dateRange: [string | null, string | null];
  isLecturePublic: boolean;
}

const initialState: LectureInfoState = {
  lectureTitle: "",
  lectureContent: "",
  selectedModal: null,
  dateRange: [null, null],
  isLecturePublic: false,
  prevModal: null,
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
      state.prevModal = state.selectedModal;
      state.selectedModal = action.payload;
    },
    setDateRange: (state, action) => {
      const [startDate, endDate] = action.payload;
      state.dateRange = [
        startDate ? timestampToDate(startDate) : null,
        endDate ? timestampToDate(endDate) : null,
      ];
    },
    setStartDate: (state, action) => {
      const startDate = action.payload;
      state.dateRange[0] = startDate ? timestampToDate(startDate) : null;
    },
    setEndDate: (state, action) => {
      const endDate = action.payload;
      state.dateRange[1] = endDate ? timestampToDate(endDate) : null;
    },
    setIsLecturePublic: (state, action) => {
      state.isLecturePublic = action.payload;
    },
    resetInput: state => {
      state.lectureTitle = initialState.lectureTitle;
      state.lectureContent = initialState.lectureContent;
      state.dateRange = initialState.dateRange;
      state.isLecturePublic = initialState.isLecturePublic;
    },
    resetInFo: () => initialState,
  },
});

export const {
  setLectureTitle,
  setLectureContent,
  setSelectedModal,
  setDateRange,
  setStartDate,
  setEndDate,
  setIsLecturePublic,
  resetInput,
  resetInFo,
} = LectureInfoSlice.actions;
export default LectureInfoSlice.reducer;
