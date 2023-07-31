import { useMemo } from 'react';
import highlightTags from "@/utils/highlightTags";

export const useDisplayedComment = (showFullComment: boolean, content: string) => {
  return useMemo(() => {
    return !showFullComment && content.length > 10
      ? highlightTags(`${content.slice(0, 10)}...`)
      : highlightTags(content);
  }, [showFullComment, content]);
};
