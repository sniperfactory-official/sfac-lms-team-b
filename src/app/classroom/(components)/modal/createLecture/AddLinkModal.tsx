import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import Layout from "../common/Layout";
import ModalHeader from "../common/ModalHeader";
import ModalMain from "../common/ModalMain";
import { setLectureContent } from "@/redux/slice/lectureInfoSlice";
import useClassroomModal from "@/hooks/lecture/useClassroomModal";

const AddLinkModal: React.FC = () => {
  const inputContent = useSelector(
    (state: RootState) => state.lectureInfo.lectureContent,
  );
  const dispatch = useDispatch();

  const { handleModalMove } = useClassroomModal();

  const prevModal = () => {
    handleModalMove("lectureTypeModalOpen", "linkModalOpen");
  };
  const handleInputContent = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatch(
      setLectureContent(
        value.startsWith("http://") ? value : "http://" + value,
      ),
    );
  };
  return (
    <Layout>
      <ModalHeader currentModalName={"링크 만들기"}>
        <button
          onClick={prevModal}
          className="text-xl font-bold text-grayscale-100"
        >
          강의 만들기
        </button>
      </ModalHeader>
      <ModalMain>
        <input
          type="text"
          name="inputContent"
          id="inputContent"
          placeholder="http://..."
          className="justify-center text-[16px] w-[707px] h-[42px] flex-shrink-0 border-[1px] border-grayscale-10 bg-grayscale-0 rounded-md pl-[14px]"
          value={inputContent}
          onChange={handleInputContent}
        />
      </ModalMain>
    </Layout>
  );
};

export default AddLinkModal;
