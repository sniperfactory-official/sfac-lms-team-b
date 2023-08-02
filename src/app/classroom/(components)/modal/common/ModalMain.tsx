import React, { FormEvent, ReactNode } from "react";
import { useDispatch, useSelector } from "react-redux";
import LectureTitle from "./LectureTitle";
import ModalFooter from "./ModalFooter";
import { closeModal } from "@/redux/slice/classroomModalSlice";
import { resetInput } from "@/redux/slice/lectureInfoSlice";
import { useCreateLecture } from "@/hooks/mutation/useCreateLecture";
import useLectureInfo from "@/hooks/lecture/useLectureInfo";
import { RootState } from "@/redux/store";

interface ModalMainProps {
  children: ReactNode;
}

const ModalMain: React.FC<ModalMainProps> = ({ children }) => {
  const dispatch = useDispatch();
  const lectureCount = useSelector(
    (state: RootState) => state.editCourse.lectureCount,
  );

  const mutation = useCreateLecture();
  const {
    user,
    courseId,
    lectureType,
    lectureTitle,
    textContent,
    noteImages,
    startDate,
    endDate,
    isLecturePrivate,
  } = useLectureInfo();

  const lectureContent = {
    images: noteImages,
    textContent,
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
