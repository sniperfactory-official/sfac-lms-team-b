import React, { FC } from "react";
import type { LectureContent } from "@/types/firebase.types";

interface LinkLectureProps {
  content: LectureContent;
}

const LinkLecture: FC<LinkLectureProps> = ({ content }) => {
  const linkKey = content.externalLink?.split("v=")[1];
  const src = `https://www.youtube.com/embed/${linkKey}`;

  return (
    <div className="linkContainer h-full w-full">
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

export default LinkLecture;
