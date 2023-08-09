import React, { FC } from "react";
import type { LectureContent, Progress } from "@/types/firebase.types";
import ReactPlayer from "react-player";

interface VideoLectureProps {
  content: LectureContent;
  progressInfo: Progress | null | undefined;
}

const VideoLecture: FC<VideoLectureProps> = ({ content, progressInfo }) => {
  const { videoUrl } = content;
  console.log(progressInfo);
  const controls = progressInfo?.isCompleted !== false;

  return (
    <div className="videoContainer h-full w-full">
      {videoUrl ? (
        <ReactPlayer
          url={videoUrl}
          width="100%"
          height="100%"
          controls={controls}
        />
      ) : (
        <div>비디오를 불러올 수 없습니다.</div>
      )}
    </div>
  );
};

export default VideoLecture;
