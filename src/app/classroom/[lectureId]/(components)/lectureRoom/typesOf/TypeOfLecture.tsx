import React, { FC } from "react";
import VideoLecture from "./VideoLecture";
import NoteLecture from "./NoteLecture";
import LinkLecture from "./LinkLecture";
import type { LectureContent } from "@/types/firebase.types";

interface TypeOfLectureProps {
  type: string;
  content: LectureContent;
}

const TypeOfLecture: FC<TypeOfLectureProps> = ({ type, content }) => {
  switch (type) {
    case "비디오":
      return <VideoLecture content={content} />;
    case "노트":
      return <NoteLecture content={content} />;
    case "링크":
      return <LinkLecture content={content} />;
    default:
      return <div>Invalid lecture type</div>;
  }
};

export default TypeOfLecture;
