import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ModalState {
  lectureTypeModalOpen: boolean;
  noteModalOpen: boolean;
  linkModalOpen: boolean;
  videoFileModalOpen: boolean;
  commentModalOpen: boolean;
  replyCommentModalOpen: boolean;
  lectureId: string | null;
  modalRole: string;
  [key: string]: boolean | string | null;
}

const initialState: ModalState = {
  lectureTypeModalOpen: false,
  noteModalOpen: false,
  linkModalOpen: false,
  videoFileModalOpen: false,
  commentModalOpen: false,
  replyCommentModalOpen: false,
  lectureId: null,
  modalRole: "",
};

const classroomModalSlice = createSlice({
  name: "classroomModal",
  initialState,
  reducers: {
    setModalVisibility: (
      state,
      action: PayloadAction<{
        modalName: string;
        visible: boolean;
        modalRole: string;
      }>,
    ) => {
      const { modalName, visible, modalRole } = action.payload;
      state[modalName] = visible;
      state.modalRole = modalRole;
    },
    closeModal: () => initialState,
  },
});

export const { setModalVisibility, closeModal } = classroomModalSlice.actions;
export default classroomModalSlice.reducer;
