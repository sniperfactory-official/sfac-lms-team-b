import Layout from "../common/Layout";
import ModalFooter from "../common/ModalFooter";
import LectureTitle from "../common/LectureTitle";
import NoteSction from "./NoteSction";
import ModalHeader from "../common/ModalHeader";
import useClassroomModal from "@/hooks/lecture/useClassroomModal";

const AddNoteModal: React.FC = () => {
  const { handleModalMove } = useClassroomModal();

  return (
    <Layout>
      <ModalHeader currentModalName={"노트 만들기"}>
        <button
          onClick={() =>
            handleModalMove("lectureTypeModalOpen", "noteModalOpen")
          }
        >
          강의 만들기
        </button>
      </ModalHeader>
      <LectureTitle />
      <NoteSction />
      <ModalFooter />
    </Layout>
  );
};

export default AddNoteModal;
