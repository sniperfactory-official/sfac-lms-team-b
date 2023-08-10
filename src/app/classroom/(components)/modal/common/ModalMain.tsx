import React, { FormEvent, ReactNode, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import LectureTitle from "./LectureTitle";
import ModalFooter from "./ModalFooter";
import { closeModal } from "@/redux/slice/classroomModalSlice";
import { resetDropzone } from "@/redux/slice/dropzoneFileSlice";
import { useCreateLecture } from "@/hooks/mutation/useCreateLecture";
import { useUpdateLecture } from "@/hooks/mutation/useUpdateLecture";
import useClassroomModal from "@/hooks/lecture/useClassroomModal";
import useLectureInfo from "@/hooks/lecture/useLectureInfo";
import useDeleteFile from "@/hooks/lecture/useDeleteFile";
import { resetInput, setError } from "@/redux/slice/lectureInfoSlice";
import "sfac-designkit-react/style.css";
import { Toast } from "sfac-designkit-react";

interface ModalMainProps {
  children: ReactNode;
}

const ModalMain: React.FC<ModalMainProps> = ({ children }) => {
  const dispatch = useDispatch();
  const { lectureInfo, modalRole } = useClassroomModal();
  const CreateMutation = useCreateLecture();
  const UpdateMutation = useUpdateLecture();
  const { onDeleteFile } = useDeleteFile();
  const lectureCount = useSelector(
    (state: RootState) => state.editCourse.lectureCount,
  );
  const videoToDeleteOnEdit = useSelector(
    (state: RootState) => state.dropzoneFile.videoToDeleteOnEdit,
  );
  const errorMessage = useSelector(
    (state: RootState) => state.lectureInfo.errorMessage,
  );

  const {
    user,
    courseId,
    lectureType,
    lectureTitle,
    externalLink,
    textContent,
    noteImages,
    videoURL,
    videoLength,
    startDate,
    endDate,
    isLecturePrivate,
  } = useLectureInfo();

  const lectureContent = {
    externalLink,
    images: noteImages,
    textContent,
    videoUrl: videoURL,
    videoLength,
  };

  const [showToast, setShowToast] = useState(false);

  const showErrorMessageToast = (message: string) => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 1500);
    dispatch(setError(message));
  };

  const linkRegex = /^(https?:\/\/)?([a-z0-9\-]+\.)+[a-z]{2,}(\/.*)*$/i;
  const isButtonDisabled =
    !lectureTitle ||
    (lectureType === "링크" && !externalLink) ||
    (lectureType === "노트" && !textContent.trim()) ||
    (lectureType === "비디오" && !videoURL.trim()) ||
    !startDate ||
    !endDate;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (lectureType === "링크" && !linkRegex.test(externalLink)) {
      showErrorMessageToast("올바른 URL 형식이 아닙니다.");
      return;
    }
    if (isButtonDisabled) {
      return;
    }
    if (user && lectureType && startDate && endDate) {
      CreateMutation.mutate({
        userId: user.uid,
        courseId: courseId,
        lectureType,
        title: lectureTitle,
        lectureContent,
        startDate,
        endDate,
        isPrivate: isLecturePrivate,
        order: lectureCount + 1,
      });
    } else if (
      modalRole === "edit" &&
      lectureInfo?.lectureId &&
      startDate &&
      endDate
    ) {
      UpdateMutation.mutate({
        lectureId: lectureInfo.lectureId,
        title: lectureTitle,
        lectureContent,
        externalLink,
        noteImages,
        textContent,
        videoURL,
        videoLength,
        startDate,
        endDate,
        isPrivate: isLecturePrivate,
      });
      videoToDeleteOnEdit && onDeleteFile(videoToDeleteOnEdit);
    }
    dispatch(closeModal());
    dispatch(resetInput());
    dispatch(resetDropzone());
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <LectureTitle />
      {children}
      <ModalFooter isButtonDisabled={isButtonDisabled} />
      <div
        className={`absolute bottom-[30px] opacity-0 transition-in-out transition-opacity duration-300 ${
          showToast ? "opacity-100" : "opacity-0"
        }`}
      >
        {showToast && <Toast type="Error" text={errorMessage} />}
      </div>
    </form>
  );
};

export default ModalMain;
