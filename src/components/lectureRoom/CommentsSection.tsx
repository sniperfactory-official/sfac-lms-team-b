import React, { FC } from "react";
import CommentForm from "../classroomModal/comment/CommentForm";
import Comment from "../classroomModal/comment/Comment";
import Layout from "../classroomModal/common/Layout";
import useClassroomModal from "@/hooks/useClassroomModal";

import { DocumentData } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { setModalVisibility } from "@/redux/slice/classroomModalSlice";

interface CommentsSectionProps {
  comments: DocumentData[] | undefined;
  onCommentClick: (id: string) => void;
}

const CommentsSection: FC<CommentsSectionProps> = ({
  comments = [],
  onCommentClick,
}) => {
  const dispatch = useDispatch();
  const { commentModalOpen } = useClassroomModal();

  return (
    <ul>
      {comments
        .filter(comment => !comment.parentId)
        .map((comment, index) => (
          <li key={index} className="cursor-pointer rounded-md m-3">
            <Comment comment={comment} onCommentClick={onCommentClick} />
          </li>
        ))}

      {commentModalOpen && (
        <Layout>
          <h2 className="text-xl font-bold">댓글 달기</h2>
          <CommentForm />
        </Layout>
      )}
    </ul>
  );
};

export default CommentsSection;
