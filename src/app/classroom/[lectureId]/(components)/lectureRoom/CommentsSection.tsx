import React, { FC } from "react";
import Comment from "../../../(components)/modal/comment/Comment";
import useGetComment from "@/hooks/queries/useGetComment";
import MiniLoadingSpinner from "@/components/Loading/MiniLoadingSpinner";
import useObserver from "@/hooks/lecture/useObserver";

interface CommentsSectionProps {
  onCommentClick: (id: string) => void;
  lectureId: string;
}

const CommentsSection: FC<CommentsSectionProps> = ({
  lectureId,
  onCommentClick,
}: CommentsSectionProps) => {
  const {
    data: comments,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useGetComment(lectureId);
  const { observerElement } = useObserver({
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  });

  if (isLoading) return <div></div>;

  return (
    <ul>
      {comments?.pages
        .flatMap(data => data.comments)
        .map(comment => (
          <li key={comment.id} className="cursor-pointer rounded-md m-3">
            <Comment comment={comment} onCommentClick={onCommentClick} />
          </li>
        ))}
      {isFetchingNextPage ? (
        <div className="w-full flex justify-center items-center">
          <MiniLoadingSpinner />
        </div>
      ) : (
        <li ref={observerElement}></li>
      )}
    </ul>
  );
};

export default CommentsSection;
