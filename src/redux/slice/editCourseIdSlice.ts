import { ILecture } from "@/hooks/queries/useGetCourseList";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface DeleteId {
  type: "course" | "lecture";
  id: string;
}

export interface IEditCourse {
  deleteIdArray: DeleteId[];
  isEditMode: boolean;
  lectureCount: number;
  selectedCourse: boolean[];
  currentLectures: ILecture[];
  newTitle: string;
  newTitleId: string;
}

const initialState: IEditCourse = {
  deleteIdArray: [],
  isEditMode: false,
  lectureCount: 0,
  selectedCourse: [],
  currentLectures: [],
  newTitle: "",
  newTitleId: "",
};

const editCourseSlice = createSlice({
  name: "editCourse",
  initialState,
  reducers: {
    // 체크박스 체크한 요소 저장하는 state
    toggleDeletionId: (state, action: PayloadAction<DeleteId>) => {
      const index = state.deleteIdArray.findIndex(
        item => item.id === action.payload.id,
      );
      if (index !== -1) {
        state.deleteIdArray.splice(index, 1);
      } else {
        state.deleteIdArray.push({
          type: action.payload.type,
          id: action.payload.id,
        });
      }
    },
    // 수정 상태인지 체크
    handleEditMode: state => {
      state.isEditMode = !state.isEditMode;
      if (!state.isEditMode) {
        state.deleteIdArray = [];
        state.lectureCount = 0;
      }
    },
    // course 하위에 lecture가 존재할 경우 course를 삭제하지 못하도록, 체크해줄 방어변수
    setLectureCount: (state, action: PayloadAction<number>) => {
      state.lectureCount = action.payload;
    },

    // 선택된 몇 번째 course가 선택된건지 체크
    setSelectedCourse: (state, action) => {
      state.selectedCourse = action.payload;
    },
    // 현재 선택된 Course의 하위 lecture
    setCurrentLecture: (state, action) => {
      state.currentLectures = action.payload;
    },
    setNewTitleId: (state, action) => {
      state.newTitleId = action.payload;
    },
    setNewTitle: (state, action) => {
      state.newTitle = action.payload;
    },
  },
});

export const {
  toggleDeletionId,
  handleEditMode,
  setLectureCount,
  setSelectedCourse,
  setCurrentLecture,
  setNewTitleId,
  setNewTitle,
} = editCourseSlice.actions;
export default editCourseSlice.reducer;
