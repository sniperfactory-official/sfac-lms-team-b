import React, { FC, useEffect, useRef, useState, useContext } from "react";
import { VideoRefContext } from "@/app/classroom/(components)/contexts/VideoContext";
import { useLectureProgress } from "@/hooks/lecture/useLectureProgress";
import { useLectureCompletion } from "@/hooks/lecture/useLectureCompletion";
import type { LectureContent, Progress } from "@/types/firebase.types";
import ReactPlayer from "react-player";

interface VideoLectureProps {
  content: LectureContent;
  progressInfo: Progress | null | undefined;
}

const VideoLecture: FC<VideoLectureProps> = ({ content, progressInfo }) => {
  const { videoUrl } = content;
  const videoRef = useRef<ReactPlayer>(null);
  const { setVideoRef } = useContext(VideoRefContext);
  const [duration, setDuration] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  useEffect(() => {
    setVideoRef(videoRef);
  }, [videoRef]);

  const { handleProgress } = useLectureProgress(
    progressInfo?.id || "",
    duration,
  );

  useLectureCompletion(progressInfo?.id || "", isCompleted);

  const handleDuration = (duration: number) => {
    setDuration(duration);
  };

  const handleEnded = () => {
    setIsCompleted(true);
  };

  useEffect(() => {
    if (progressInfo?.playTimes[0]?.start) {
      videoRef.current?.seekTo(Number(progressInfo.playTimes[0].start));
    }
  }, [progressInfo]);

  return (
    <div className="videoContainer h-full w-full">
        {videoUrl ? (
          <ReactPlayer
            ref={videoRef}
            url={videoUrl}
            width="100%"
            height="100%"
            controls
            onProgress={handleProgress}
            onDuration={handleDuration}
            onEnded={handleEnded}
          />
        ) : (
          <div>비디오를 불러올 수 없습니다.</div>
        )}
    </div>
  );
};

export default VideoLecture;
