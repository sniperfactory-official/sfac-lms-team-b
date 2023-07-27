import { useState } from "react";
import Image from "next/image";
import Layout from "../common/Layout";
import ModalHeader from "../common/ModalHeader";
import LectureTitle from "../common/LectureTitle";
import DropzoneSection from "./DropzoneSection";
import ModalFooter from "../common/ModalFooter";
import useClassroomModal from "@/hooks/lecture/useClassroomModal";
import useVideoFileDrop from "@/hooks/lecture/useVideoFileDrop";

const AddVideoFileModal: React.FC = () => {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const { handleModalMove } = useClassroomModal();
  const { handleRemoveVideoFile } = useVideoFileDrop({
    setVideoFile: setVideoFile,
  });

  return (
    <Layout>
      <ModalHeader currentModalName={"영상 강의 만들기"}>
        <button
          onClick={() =>
            handleModalMove("lectureTypeModalOpen", "videoFileModalOpen")
          }
        >
          강의 만들기
        </button>
      </ModalHeader>
      <LectureTitle />
      {videoFile && (
        <div className="flex gap-3 items-center">
          <Image
            src={"/images/file-icon.svg"}
            alt={"파일 아이콘"}
            width={0}
            height={0}
            className="w-9 h-auto"
          />
          <span className="font-bold text-base text-primary-80">
            {videoFile?.name}
          </span>
          <button
            type="button"
            className="ml-auto text-xs text-grayscale-100 hover:font-bold"
            onClick={handleRemoveVideoFile}
          >
            삭제
          </button>
        </div>
      )}
      <DropzoneSection setVideoFile={setVideoFile} />
      <ModalFooter />
    </Layout>
  );
};

export default AddVideoFileModal;
