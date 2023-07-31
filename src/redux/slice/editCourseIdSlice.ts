import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface DeleteId {
  type: "course" | "lecture";
  id: string;
}

export interface IEditCourse {
  deleteIdArray: DeleteId[];
  isEditMode: boolean;
  lectureCount: number;
}

const initialState: IEditCourse = {
  deleteIdArray: [],
  isEditMode: false,
  lectureCount: 0,
};

const editCourseSlice = createSlice({
  name: "editCourse",
  initialState,
  reducers: {
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

    handleEditMode: state => {
      state.isEditMode = !state.isEditMode;
      if (!state.isEditMode) {
        state.deleteIdArray = [];
        state.lectureCount = 0;
      }
    },

    setLectureCount: (state, action: PayloadAction<number>) => {
      state.lectureCount = action.payload;
    },
  },
});

export const { toggleDeletionId, handleEditMode, setLectureCount } =
  editCourseSlice.actions;
export default editCourseSlice.reducer;
