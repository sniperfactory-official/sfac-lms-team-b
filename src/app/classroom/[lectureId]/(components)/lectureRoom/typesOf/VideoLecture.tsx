import React, { FC, useState, useEffect } from "react";
import type { LectureContent } from "@/types/firebase.types";
import { getMediaURL } from "@/hooks/lecture/useGetMediaURL";

interface VideoLectureProps {
  content: LectureContent;
}

const VideoLecture: FC<VideoLectureProps> = ({ content }) => {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  useEffect(() => {
    getMediaURL(content.videoUrl).then(setVideoUrl).catch(console.error);
  }, [content.videoUrl]);

  return (
    <div className="videoContainer h-full w-full">
      {videoUrl ? (
        <video
          src={videoUrl}
          title="video player"
          className="w-full h-full"
          autoPlay
          controls
          muted
          playsInline
        />
      ) : (
        <div>비디오를 불러올 수 없습니다.</div>
      )}
    </div>
  );
};

export default VideoLecture;
