import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ModalState {
  lectureTypeModalOpen: boolean;
  noteModalOpen: boolean;
  linkModalOpen: boolean;
  videoFileModalOpen: boolean;
  commentModalOpen: boolean;
  replyCommentModalOpen: boolean;
  [key: string]: boolean;
}

const initialState: ModalState = {
  lectureTypeModalOpen: false,
  noteModalOpen: false,
  linkModalOpen: false,
  videoFileModalOpen: false,
  commentModalOpen: false,
  replyCommentModalOpen: false,
};

const classroomModalSlice = createSlice({
  name: "classroomModal",
  initialState,
  reducers: {
    setModalVisibility: (
      state,
      action: PayloadAction<{ modalName: string; visible: boolean }>,
    ) => {
      const { modalName, visible } = action.payload;
      state[modalName] = visible;
    },
    closeModal: () => initialState,
  },
});

export const { setModalVisibility, closeModal } = classroomModalSlice.actions;
export default classroomModalSlice.reducer;
