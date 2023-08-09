import React, { FormEvent, ReactNode } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import LectureTitle from "./LectureTitle";
import ModalFooter from "./ModalFooter";
import { closeModal } from "@/redux/slice/classroomModalSlice";
import { resetInput } from "@/redux/slice/lectureInfoSlice";
import { resetDropzone } from "@/redux/slice/dropzoneFileSlice";
import { useCreateLecture } from "@/hooks/mutation/useCreateLecture";
import { useUpdateLecture } from "@/hooks/mutation/useUpdateLecture";
import useClassroomModal from "@/hooks/lecture/useClassroomModal";
import useLectureInfo from "@/hooks/lecture/useLectureInfo";

interface ModalMainProps {
  children: ReactNode;
}

const ModalMain: React.FC<ModalMainProps> = ({ children }) => {
  const dispatch = useDispatch();
  const { lectureInfo, modalRole } = useClassroomModal();
  const CreateMutation = useCreateLecture();
  const UpdateMutation = useUpdateLecture();
  const lectureCount = useSelector(
    (state: RootState) => state.editCourse.lectureCount,
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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (modalRole !== "edit" && user && startDate && endDate) {
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
    }
    dispatch(closeModal());
    dispatch(resetInput());
    dispatch(resetDropzone());
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <LectureTitle />
      {children}
      <ModalFooter />
    </form>
  );
};

export default ModalMain;
