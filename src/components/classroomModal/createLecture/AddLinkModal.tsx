import { useSelector, useDispatch } from "react-redux";
import { setInputContent } from "@/redux/slice/linkContentSlice";
import Layout from "../common/Layout";
//import { ModalSubmitButton } from "./common/ModalSubmitButton";
import useClassroomModal from "@/hooks/lecture/useClassroomModal";
import ModalHeader from "../common/ModalHeader";
import LectureTitle from "../common/LectureTitle";
import ModalFooter from "../common/ModalFooter";

const AddLinkModal: React.FC = ({}) => {
  const inputContent = useSelector((state: any) => state.content.inputContent);
  const dispatch = useDispatch();

  const { handleModalMove } = useClassroomModal();

  const prevModal = () => {
    handleModalMove("lectureTypeModalOpen", "linkModalOpen");
  };
  const handleInputContent = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatch(
      setInputContent(value.startsWith("http://") ? value : "http://" + value),
    );
  };
  return (
    <Layout>
      <div className="text-left">
        <ModalHeader currentModalName={"링크 만들기"}>
          <button
            onClick={prevModal}
            className="text-xl font-bold text-grayscale-100"
          >
            강의 만들기
          </button>
        </ModalHeader>
        <LectureTitle />
        <input
          type="text"
          name="link"
          placeholder="http://..."
          className="justify-center text-[16px] w-[707px] h-[42px] flex-shrink-0 border-[1px] border-gray-300 bg-white rounded-md pl-[14px]"
          value={inputContent}
          onChange={handleInputContent}
        />
        <ModalFooter />
      </div>
    </Layout>
  );
};

export default AddLinkModal;
