import React, { FC } from "react";
import type { LectureContent } from "@/types/firebase.types";
import ReactMarkdown from "react-markdown";

interface NoteLectureProps {
  content: LectureContent;
}

const NoteLecture: FC<NoteLectureProps> = ({ content }) => {
  const { textContent } = content;
  return (
    <div className="noteContainer h-full w-full">
      <div className="prose p-10">
        <ReactMarkdown>{textContent}</ReactMarkdown>
      </div>
    </div>
  );
};

export default NoteLecture;
