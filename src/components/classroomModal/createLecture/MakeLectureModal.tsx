import { useState } from "react";
import Layout from "../common/Layout";
import Image from "next/image";
import useClassroomModal from "@/hooks/lecture/useClassroomModal";
import ModalHeader from "../common/ModalHeader";

const MakeLectureModal: React.FC = ({}) => {
  const isSelectModal = (modal: string) => {
    setSelectedModal(modal);
  };
  const [selectedModal, setSelectedModal] = useState<string | null>(null);
  const { handleModalMove } = useClassroomModal();

  const onNextButtonClick = () => {
    if (selectedModal === "note") {
      // 노트 모달 선택 시 처리할 로직
      handleModalMove("noteModalOpen", "lectureTypeModalOpen");
    } else if (selectedModal === "video") {
      // 영상 모달 선택 시 처리할 로직
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
            onClick={() => isSelectModal("note")}
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
            onClick={() => isSelectModal("video")}
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
            onClick={() => isSelectModal("link")}
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
