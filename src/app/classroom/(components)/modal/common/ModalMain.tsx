import React, { FormEvent, ReactNode, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LectureTitle from "./LectureTitle";
import ModalFooter from "./ModalFooter";
import { closeModal } from "@/redux/slice/classroomModalSlice";
import {
  clearError,
  resetInput,
  setError,
} from "@/redux/slice/lectureInfoSlice";
import { useCreateLecture } from "@/hooks/mutation/useCreateLecture";
import useLectureInfo from "@/hooks/lecture/useLectureInfo";
import { RootState } from "@/redux/store";
import { resetDropzone } from "@/redux/slice/dropzoneFileSlice";

interface ModalMainProps {
  children: ReactNode;
}

const ModalMain: React.FC<ModalMainProps> = ({ children }) => {
  const dispatch = useDispatch();
  const lectureCount = useSelector(
    (state: RootState) => state.editCourse.lectureCount,
  );
  const errorMessage = useSelector(
    (state: RootState) => state.lectureInfo.errorMessage,
  );

  const mutation = useCreateLecture();
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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!lectureTitle) {
      dispatch(setError("강의 제목을 입력해주세요."));
      return;
    }
    if (!startDate || !endDate) {
      dispatch(setError("수강 기간을 선택해주세요."));
      return;
    }
    if (lectureType === "링크") {
      const linkRegex = /^(https?:\/\/)?([a-z0-9\-]+\.)+[a-z]{2,}(\/.*)*$/i;
      if (!externalLink || !externalLink.trim()) {
        dispatch(setError("링크 강의가 존재하지 않습니다."));
        return;
      } else if (!linkRegex.test(externalLink)) {
        dispatch(setError("올바른 URL 형식이 아닙니다."));
        return;
      } else {
        dispatch(clearError());
      }
    }
    if (lectureType === "노트" && !textContent.trim()) {
      dispatch(setError("노트 강의가 존재하지 않습니다."));
      return;
    }
    if (lectureType === "비디오" && !videoURL.trim()) {
      dispatch(setError("비디오 강의가 존재하지 않습니다."));
      return;
    }

    if (user && lectureType && startDate && endDate) {
      mutation.mutate({
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
    }

    dispatch(closeModal());
    dispatch(resetInput());
    dispatch(resetDropzone());
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <LectureTitle />
      {children}
      {errorMessage && <span className="text-red">{errorMessage}</span>}
      <ModalFooter />
    </form>
  );
};

export default ModalMain;
