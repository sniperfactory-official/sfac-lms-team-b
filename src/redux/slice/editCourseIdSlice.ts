import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface DeleteId {
  type : 'course' | 'lecture';
  id : string
}

export interface IEditCourse {
  deleteIdArray : DeleteId[],
  isEditMode : boolean
}

const initialState: IEditCourse = {
  deleteIdArray : [],
  isEditMode : false,
};

const editCourseSlice = createSlice({
  name: "editCourse",
  initialState,
  reducers: {
    toggleDeletionId: (state, action: PayloadAction<DeleteId>) => {
      const index = state.deleteIdArray.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.deleteIdArray.splice(index, 1);
      } else {
        state.deleteIdArray.push({type: action.payload.type, id: action.payload.id});
      }
    },
    resetDeletionId: (state) => {
      state.deleteIdArray = [];
    },
    handleEditMode: (state) => {
      console.log('hello handleEditMOdeㅅ');
      
      state.isEditMode = !state.isEditMode
      state.deleteIdArray = [];
    }
  },
});

export const { toggleDeletionId, resetDeletionId, handleEditMode } = editCourseSlice.actions;
export default editCourseSlice.reducer;
