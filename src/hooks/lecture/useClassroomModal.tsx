import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { setModalVisibility } from "@/redux/slice/classroomModalSlice";

const useClassroomModal = () => {
  const dispatch = useDispatch();

  const lectureTypeModalOpen = useSelector(
    (state: RootState) => state.classroomModal.lectureTypeModalOpen,
  );
  const noteModalOpen = useSelector(
    (state: RootState) => state.classroomModal.noteModalOpen,
  );
  const linkModalOpen = useSelector(
    (state: RootState) => state.classroomModal.linkModalOpen,
  );
  const videoFileModalOpen = useSelector(
    (state: RootState) => state.classroomModal.videoFileModalOpen,
  );
  const commentModalOpen = useSelector(
    (state: RootState) => state.classroomModal.commentModalOpen,
  );
  const replyCommentModalOpen = useSelector(
    (state: RootState) => state.classroomModal.replyCommentModalOpen,
  );
  const modalRole = useSelector(
    (state: RootState) => state.classroomModal.modalRole,
  );
  const lectureInfo = useSelector(
    (state: RootState) => state.classroomModal.lectureInfo,
  );

  const handleModalMove = (openModalName: string, closeModalName: string) => {
    dispatch(
      setModalVisibility({
        modalName: openModalName,
        visible: true,
        modalRole: "create",
      }),
    );
    dispatch(
      setModalVisibility({
        modalName: closeModalName,
        visible: false,
        modalRole: "create",
      }),
    );
  };

  return {
    lectureTypeModalOpen,
    noteModalOpen,
    linkModalOpen,
    videoFileModalOpen,
    commentModalOpen,
    replyCommentModalOpen,
    modalRole,
    lectureInfo,
    handleModalMove,
  };
};

export default useClassroomModal;
