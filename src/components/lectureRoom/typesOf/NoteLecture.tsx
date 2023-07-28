import React, { FC } from "react";
import type { LectureContent } from "@/types/firebase.Types";

interface NoteLectureProps {
  content: LectureContent;
}

const NoteLecture: FC<NoteLectureProps> = ({ content }) => {
  const src = `https://www.youtube.com/embed/${content}`;

  return (
    <div className="noteContainer h-full w-full">
      <iframe
        src={src}
        title="video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-full"
      />
    </div>
  );
};

export default NoteLecture;
