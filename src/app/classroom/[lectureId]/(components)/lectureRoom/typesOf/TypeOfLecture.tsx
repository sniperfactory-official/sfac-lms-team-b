import React, { FC } from "react";

import useGetLectureInfo from "@/hooks/queries/useGetLectureInfo";
import LectureContent from "./LectureContent";

interface TypeOfLectureProps {
  lectureId: string;
}

const TypeOfLecture: FC<TypeOfLectureProps> = ({ lectureId }) => {
  const { data } = useGetLectureInfo(lectureId);

  if (!data || data.lectureContent === undefined) {
    return <div>Loading...</div>;
  }

  const { lectureType: type, lectureContent: content } = data;

  return <LectureContent type={type} content={content} />;
};

export default TypeOfLecture;
