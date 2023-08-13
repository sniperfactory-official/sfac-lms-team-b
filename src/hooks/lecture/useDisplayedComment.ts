import { useMemo } from "react";
import highlightTags from "@/utils/highlightTags";

export const useDisplayedComment = (
  showFullComment: boolean,
  content: string,
  videoRef: React.RefObject<any> | null,
) => {
  const handleClickTimestamp = (time: string) => {
    console.log(videoRef);
    if (videoRef?.current) {
      const [minutes, seconds] = time.split(":").map(Number);
      const seekTime = minutes * 60 + seconds;
      videoRef.current.seekTo(seekTime);
    }
  };

  return useMemo(() => {
    return !showFullComment && content.length > 10
      ? highlightTags(`${content.slice(0, 10)}...`, handleClickTimestamp)
      : highlightTags(content, handleClickTimestamp);
  }, [showFullComment, content]);
};
