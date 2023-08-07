import { ILecture } from "@/hooks/queries/useGetCourseList";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ModalState {
  lectureTypeModalOpen: boolean;
  noteModalOpen: boolean;
  linkModalOpen: boolean;
  videoFileModalOpen: boolean;
  commentModalOpen: boolean;
  replyCommentModalOpen: boolean;
  modalRole: string;
  lecture: ILecture | null;
  [key: string]: boolean | string | ILecture | null;
}

const initialState: ModalState = {
  lectureTypeModalOpen: false,
  noteModalOpen: false,
  linkModalOpen: false,
  videoFileModalOpen: false,
  commentModalOpen: false,
  replyCommentModalOpen: false,
  modalRole: "",
  lecture: null,
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
    setLecture: (state, action: PayloadAction<ILecture | null>) => {
      state.lecture = action.payload;
    },
    closeModal: () => initialState,
  },
});

export const { setModalVisibility, setLecture, closeModal } =
  classroomModalSlice.actions;
export default classroomModalSlice.reducer;
