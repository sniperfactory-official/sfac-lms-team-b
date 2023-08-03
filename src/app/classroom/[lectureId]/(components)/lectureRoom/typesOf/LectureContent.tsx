import React, { FC } from "react";
import useGetLectureInfo from "@/hooks/queries/useGetLectureInfo";

import VideoLecture from "./VideoLecture";
import NoteLecture from "./NoteLecture";
import LinkLecture from "./LinkLecture";

interface LectureContentProps {
  type: string;
  content: object;
}

const LectureContent: FC<LectureContentProps> = ({ type, content }) => {
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

export default LectureContent;
