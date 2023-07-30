import React, { FC } from "react";
import CommentForm from "../classroomModal/comment/CommentForm";
import Comment from "../classroomModal/comment/Comment";
import Layout from "../classroomModal/common/Layout";
import useClassroomModal from "@/hooks/lecture/useClassroomModal";
import { DocumentData } from "firebase/firestore";

interface CommentsSectionProps {
  comments: DocumentData[] | undefined;
  onCommentClick: (id: string) => void;
  lectureId: string;
}

const CommentsSection: FC<CommentsSectionProps> = ({
  comments = [],
  onCommentClick,
  lectureId
}) => {
  const { commentModalOpen } = useClassroomModal();

  return (
    <ul>
      {comments
        .filter(comment => !comment.parentId)
        .map(comment => (
          <li key={comment.id} className="cursor-pointer rounded-md m-3">
            <Comment comment={comment} onCommentClick={onCommentClick} />
          </li>
        ))}

      {commentModalOpen && (
        <Layout>
          <h2 className="text-xl font-bold">댓글 달기</h2>
          <CommentForm lectureId={lectureId} />
        </Layout>
      )}
    </ul>
  );
};

export default CommentsSection;
