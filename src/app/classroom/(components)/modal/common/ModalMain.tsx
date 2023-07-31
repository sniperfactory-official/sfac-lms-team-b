import React, { FormEvent, ReactNode } from "react";
import { useDispatch } from "react-redux";
import LectureTitle from "./LectureTitle";
import ModalFooter from "./ModalFooter";
import { closeModal } from "@/redux/slice/classroomModalSlice";
import { resetInput } from "@/redux/slice/lectureInfoSlice";

interface ModalMainProps {
  children: ReactNode;
}

const ModalMain:React.FC<ModalMainProps> = ({children}) => {
  const dispatch = useDispatch();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
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
