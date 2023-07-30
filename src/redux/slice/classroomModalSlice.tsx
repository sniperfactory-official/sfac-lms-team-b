import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ModalState {
  lectureTypeModalOpen: boolean;
  noteModalOpen: boolean;
  linkModalOpen: boolean;
  videoFileModalOpen: boolean;
  commentModalOpen: boolean;
  replyCommentModalOpen: boolean;
  lectureId: string | null;
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
    setLectureId: (state, action: PayloadAction<string | null>) => {
      state.lectureId = action.payload;
    },
    closeModal: () => initialState,
  },
});

export const { setModalVisibility, setLectureId, closeModal } =
  classroomModalSlice.actions;
export default classroomModalSlice.reducer;
