import dynamic from "next/dynamic";
import Layout from "../common/Layout";
import ModalHeader from "../common/ModalHeader";
import ModalMain from "../common/ModalMain";
import useClassroomModal from "@/hooks/lecture/useClassroomModal";
import useFirebaseLectureSlice from "@/hooks/lecture/useFirebaseLectureSlice";

const NoSsrEditor = dynamic(() => import("./NoteSection"), {
  ssr: false,
  loading: () => <div>Loading...</div>,
});

const NoteModal: React.FC = () => {
  const { modalRole, handleModalMove } = useClassroomModal();
  useFirebaseLectureSlice();
  const MODAL_ROLE_OBJ: { [key: string]: string } = {
    create: "노트 만들기",
    edit: "수정하기",
  };

  return (
    <Layout>
      <ModalHeader currentModalName={MODAL_ROLE_OBJ[modalRole]}>
        {modalRole === "create" ? (
          <button
            onClick={() =>
              handleModalMove("lectureTypeModalOpen", "noteModalOpen")
            }
          >
            강의 만들기
          </button>
        ) : (
          <span>강의 수정</span>
        )}
      </ModalHeader>
      <ModalMain>
        <NoSsrEditor />
      </ModalMain>
    </Layout>
  );
};

export default NoteModal;
