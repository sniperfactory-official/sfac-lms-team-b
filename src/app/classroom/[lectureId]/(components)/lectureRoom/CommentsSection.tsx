import React, { FC, useRef, useEffect, useState } from "react";
import CommentForm from "../../../(components)/modal/comment/CommentForm";
import Comment from "../../../(components)/modal/comment/Comment";
import Layout from "../../../(components)/modal/common/Layout";
import useClassroomModal from "@/hooks/lecture/useClassroomModal";
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
  const { commentModalOpen } = useClassroomModal();
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
      {commentModalOpen && (
        <Layout>
          <h2 className="text-xl font-bold">댓글 달기</h2>
          <CommentForm lectureId={lectureId} isReply={false} />
        </Layout>
      )}
    </ul>
  );
};

export default CommentsSection;
