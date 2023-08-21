import dynamic from "next/dynamic";
import Layout from "../common/Layout";
import ModalHeader from "../common/ModalHeader";
import ModalMain from "../common/ModalMain";
import useFirebaseLectureSlice from "@/hooks/lecture/useFirebaseLectureSlice";

const NoSsrEditor = dynamic(() => import("./NoteSection"), {
  ssr: false,
  loading: () => <div>Loading...</div>,
});

const NoteModal: React.FC = () => {
  useFirebaseLectureSlice();

  return (
    <Layout>
      <ModalHeader currentModalName="noteModalOpen" />
      <ModalMain>
        <NoSsrEditor />
      </ModalMain>
    </Layout>
  );
};

export default NoteModal;
