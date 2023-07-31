import { useDispatch, useSelector } from "react-redux";
import { setSelectedModal, resetInput } from "@/redux/slice/lectureInfoSlice";
import { RootState } from "@/redux/store";
import Layout from "../common/Layout";
import ModalHeader from "../common/ModalHeader";
import Image from "next/image";
import useClassroomModal from "@/hooks/lecture/useClassroomModal";

const MakeLectureModal: React.FC = () => {
  const { handleModalMove } = useClassroomModal();
  const dispatch = useDispatch();
  const selectedModal = useSelector(
    (state: RootState) => state.lectureInfo.selectedModal,
  );

  const selectModalType = (modal: string) => {
    dispatch(setSelectedModal(modal));
  };

  const onNextButtonClick = () => {
    if (selectedModal === "note") {
      handleModalMove("noteModalOpen", "lectureTypeModalOpen");
    } else if (selectedModal === "video") {
      handleModalMove("videoFileModalOpen", "lectureTypeModalOpen");
    } else if (selectedModal === "link") {
      handleModalMove("linkModalOpen", "lectureTypeModalOpen");
    }
  };
  return (
    <Layout>
      <div className="flex flex-col gap-[26px]">
        <ModalHeader currentModalName={"강의 만들기"}></ModalHeader>
        <div className="flex justify-between">
          <div
            id="note"
            className={`flex flex-col items-center justify-center border-2 border-grayscale-10 rounded-md w-[222px] h-[153px] text-[18px] cursor-pointer ${
              selectedModal === "note" ? "bg-primary-5 border-primary-60" : ""
            }`}
            onClick={() => selectModalType("note")}
          >
            <Image
              src="images/note.svg"
              alt="note"
              width={60}
              height={60}
              className="pb-[12px]"
            />
            노트 만들기
          </div>
          <div
            id="video"
            className={`flex flex-col items-center justify-center border-2 border-grayscale-10 rounded-md w-[222px] h-[153px] text-[18px] cursor-pointer ${
              selectedModal === "video" ? "bg-primary-5 border-primary-60" : ""
            }`}
            onClick={() => selectModalType("video")}
          >
            <Image
              src="images/video.svg"
              alt="video"
              width={60}
              height={60}
              className="pb-[12px]"
            />
            영상 강의 만들기
          </div>
          <div
            id="link"
            className={`flex flex-col items-center justify-center border-2 border-grayscale-10 rounded-md w-[222px] h-[153px] text-[18px] cursor-pointer ${
              selectedModal === "link" ? "bg-primary-5 border-primary-60" : ""
            }`}
            onClick={() => selectModalType("link")}
          >
            <Image
              src="images/link.svg"
              alt="link"
              width={60}
              height={60}
              className="pb-[12px]"
            />
            링크 만들기
          </div>
        </div>
        <button
          onClick={onNextButtonClick}
          className="rounded-md text-white bg-primary-80 w-[107px] h-[45px] mb-[-20px] ml-auto"
        >
          다음
        </button>
      </div>
    </Layout>
  );
};

export default MakeLectureModal;
