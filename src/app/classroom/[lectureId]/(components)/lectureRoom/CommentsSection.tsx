import React, { FC, useState } from "react";
import { LectureComment } from "@/types/firebase.types";
import Comment from "../../../(components)/modal/comment/Comment";
import useObserver from "@/hooks/lecture/useObserver";

interface CommentsSectionProps {
  onCommentClick: (id: string) => void;
  comments: LectureComment[];
}

const CommentsSection: FC<CommentsSectionProps> = ({
  comments,
  onCommentClick,
}) => {
  const PAGE_SIZE = 6;
  const [displayedComments, setDisplayedComments] = useState<LectureComment[]>(
    comments.slice(0, PAGE_SIZE),
  );
  const hasMoreComments = comments.length > displayedComments.length;

  const fetchNextPage = () => {
    const newComments = comments.slice(
      displayedComments.length,
      displayedComments.length + PAGE_SIZE,
    );
    setDisplayedComments(prevComments => [...prevComments, ...newComments]);
  };

  const { observerElement } = useObserver({
    isFetchingNextPage: false,
    hasNextPage: hasMoreComments,
    fetchNextPage,
  });

  return (
    <ul>
      {displayedComments.map(comment => (
        <li key={comment.id} className="cursor-pointer rounded-md m-3">
          <Comment comment={comment} onCommentClick={onCommentClick} />
        </li>
      ))}
      {hasMoreComments ? <li ref={observerElement}></li> : null}
    </ul>
  );
};

export default CommentsSection;
