import dynamic from "next/dynamic";
import Layout from "../common/Layout";
import ModalHeader from "../common/ModalHeader";
import ModalMain from "../common/ModalMain";
import useClassroomModal from "@/hooks/lecture/useClassroomModal";

const NoSsrEditor = dynamic(() => import("./NoteSection"), {
  ssr: false,
});

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
      <ModalMain>
        <NoSsrEditor />
      </ModalMain>
    </Layout>
  );
};

export default AddNoteModal;
