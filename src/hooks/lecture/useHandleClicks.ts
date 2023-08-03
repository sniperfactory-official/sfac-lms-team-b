import { useCallback } from "react";
import { UseMutationResult } from "@tanstack/react-query";

export const useHandleClicks = (
  onCommentClick: ((id: string) => void) | undefined,
  deleteMutation: UseMutationResult<void, unknown, string, unknown>,
) => {
  const handleCommentClick = useCallback(
    (id: string) => {
      if (onCommentClick) {
        onCommentClick(id);
      }
    },
    [onCommentClick],
  );
  const handleDeleteClick = useCallback(
    (e: React.MouseEvent, id: string) => {
      e.stopPropagation();
      deleteMutation.mutate(id);
    },
    [deleteMutation],
  );

  return { handleCommentClick, handleDeleteClick };
};
