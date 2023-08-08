import React, { FC } from "react";
import { Progress } from "@/types/firebase.types";

import VideoLecture from "./VideoLecture";
import NoteLecture from "./NoteLecture";
import LinkLecture from "./LinkLecture";

interface LectureContentProps {
  type: string;
  content: object;
  progressInfo: Progress | null | undefined;
}

const LectureContent: FC<LectureContentProps> = ({
  type,
  content,
  progressInfo,
}) => {
  switch (type) {
    case "비디오":
      return <VideoLecture content={content} progressInfo={progressInfo} />;
    case "노트":
      return <NoteLecture content={content} />;
    case "링크":
      return <LinkLecture content={content} />;
    default:
      return <div>Invalid lecture type</div>;
  }
};

export default LectureContent;
