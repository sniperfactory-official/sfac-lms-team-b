import { useDispatch } from "react-redux";
import Layout from "../common/Layout";
import ModalHeader from "../common/ModalHeader";
import ModalMain from "../common/ModalMain";
import { clearError, setExternalLink } from "@/redux/slice/lectureInfoSlice";
import useClassroomModal from "@/hooks/lecture/useClassroomModal";
import useLectureInfo from "@/hooks/lecture/useLectureInfo";
import useFirebaseLectureSlice from "@/hooks/lecture/useFirebaseLectureSlice";

const AddLinkModal: React.FC = () => {
  const dispatch = useDispatch();
  const { modalRole, handleModalMove } = useClassroomModal();
  const { externalLink } = useLectureInfo();
  const MODAL_ROLE_OBJ: { [key: string]: string } = {
    create: "링크 만들기",
    edit: "수정하기",
  };
  const handleInputContent = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setExternalLink(e.target.value));
    if (e.target.value.trim()) {
      dispatch(clearError());
    }
  };
  useFirebaseLectureSlice();

  return (
    <Layout>
      <ModalHeader currentModalName={MODAL_ROLE_OBJ[modalRole]}>
        {modalRole === "create" ? (
          <button
            onClick={() =>
              handleModalMove("lectureTypeModalOpen", "linkModalOpen")
            }
          >
            강의 만들기
          </button>
        ) : (
          <span>강의 수정</span>
        )}
      </ModalHeader>
      <ModalMain>
        <label htmlFor="externalLink" className="hidden" />
        <input
          type="text"
          name="externalLink"
          id="externalLink"
          placeholder="https://..."
          className="justify-center text-[16px] w-[707px] h-[42px] flex-shrink-0 border-[1px] border-grayscale-10 bg-grayscale-0 rounded-md pl-[14px]"
          value={externalLink}
          onChange={handleInputContent}
        />
      </ModalMain>
    </Layout>
  );
};

export default AddLinkModal;
