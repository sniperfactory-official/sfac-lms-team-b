import { createSlice } from "@reduxjs/toolkit";
import timestampToDate from "@/utils/timestampToDate";
import { Timestamp } from "firebase/firestore";
import { Action } from "@reduxjs/toolkit";

type PayloadAction<P = void> = P extends void
  ? Action<string>
  : Action<string> & { payload: P };
/* const now = new Date();
const startDate: Timestamp | null = now
  ? new Timestamp(now.getTime() / 1000, 0)
  : new Timestamp(0, 0);
const endDate: Timestamp | null = now
  ? new Timestamp(now.getTime() / 1000, 0)
  : new Timestamp(0, 0);
 */
interface LectureInfoState {
  lectureTitle: string;
  lectureContent: string;
  selectedModal: string | null;
  startDate: any;
  endDate: any;
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
    setStartDate: (state, action: PayloadAction<Timestamp>) => {
      state.startDate = action.payload;
    },

    setEndDate: (state, action: PayloadAction<Timestamp>) => {
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
