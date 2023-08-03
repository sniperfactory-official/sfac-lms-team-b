import React, { FC } from "react";
import type { LectureContent } from "@/types/firebase.types";

interface VideoLectureProps {
  content: LectureContent;
}

const VideoLecture: FC<VideoLectureProps> = ({ content }) => {
  const { videoUrl } = content;

  return (
    <div className="videoContainer h-full w-full">
      {videoUrl ? (
        <video
          src={videoUrl}
          title="video player"
          className="w-full h-full"
          controls
        />
      ) : (
        <div>비디오를 불러올 수 없습니다.</div>
      )}
    </div>
  );
};

export default VideoLecture;
