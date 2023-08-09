import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setLectureType, resetInput } from "@/redux/slice/lectureInfoSlice";
import Image from "next/image";
import Layout from "../common/Layout";
import ModalHeader from "../common/ModalHeader";
import useClassroomModal from "@/hooks/lecture/useClassroomModal";

const MakeLectureModal: React.FC = () => {
  const { handleModalMove } = useClassroomModal();
  const dispatch = useDispatch();
  const lectureType = useSelector(
    (state: RootState) => state.lectureInfo.lectureType,
  );
  const [selectedModal, setSelectedModal] = useState<string>(lectureType);

  const onNextButtonClick = (modalName: string) => {
    if (lectureType !== modalName) {
      dispatch(resetInput());
    }

    if (modalName === "노트") {
      handleModalMove("noteModalOpen", "lectureTypeModalOpen");
    } else if (modalName === "비디오") {
      handleModalMove("videoFileModalOpen", "lectureTypeModalOpen");
    } else if (modalName === "링크") {
      handleModalMove("linkModalOpen", "lectureTypeModalOpen");
    }

    dispatch(setLectureType(modalName));
  };
  return (
    <Layout>
      <div className="flex flex-col gap-[26px]">
        <ModalHeader currentModalName={"강의 만들기"} />
        <div className="flex justify-between">
          <button
            type="button"
            className={`flex flex-col items-center justify-center 1013
            border-2 border-grayscale-10 rounded-md w-[222px] h-[153px] text-[18px] cursor-pointer ${
              selectedModal === "노트" ? "bg-primary-5 border-primary-60" : ""
            }`}
            onClick={() => setSelectedModal("노트")}
          >
            <Image
              src="images/note.svg"
              alt="note"
              width={60}
              height={60}
              className="pb-[12px]"
            />
            노트 만들기
          </button>
          <button
            type="button"
            className={`flex flex-col items-center justify-center border-2 border-grayscale-10 rounded-md w-[222px] h-[153px] text-[18px] cursor-pointer ${
              selectedModal === "비디오" ? "bg-primary-5 border-primary-60" : ""
            }`}
            onClick={() => setSelectedModal("비디오")}
          >
            <Image
              src="images/video.svg"
              alt="video"
              width={60}
              height={60}
              className="pb-[12px]"
            />
            영상 강의 만들기
          </button>
          <button
            type="button"
            className={`flex flex-col items-center justify-center border-2 border-grayscale-10 rounded-md w-[222px] h-[153px] text-[18px] cursor-pointer ${
              selectedModal === "링크" ? "bg-primary-5 border-primary-60" : ""
            }`}
            onClick={() => setSelectedModal("링크")}
          >
            <Image
              src="images/link.svg"
              alt="link"
              width={60}
              height={60}
              className="pb-[12px]"
            />
            링크 만들기
          </button>
        </div>
        <button
          type="button"
          className="rounded-md text-white bg-primary-80 w-[107px] h-[45px] mb-[-20px] ml-auto"
          onClick={() => onNextButtonClick(selectedModal)}
        >
          다음
        </button>
      </div>
    </Layout>
  );
};

export default MakeLectureModal;
