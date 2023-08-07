import React, { FC } from "react";
import { Lecture } from "@/types/firebase.types";

import LectureContent from "./LectureContent";
import LoadingSpinner from "@/components/Loading/Loading";

interface TypeOfLectureProps {
  lectureData: Lecture | undefined;
}

const TypeOfLecture: FC<TypeOfLectureProps> = ({ lectureData }) => {
  if (!lectureData || lectureData.lectureContent === undefined) {
    return (
      <div className="w-screen flex justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  const { lectureType: type, lectureContent: content } = lectureData;

  return <LectureContent type={type} content={content} />;
};

export default TypeOfLecture;
