import React, { FC } from "react";
import CommentForm from "../classroomModal/comment/CommentForm";
import Comment from "../classroomModal/comment/Comment";
import Layout from "../classroomModal/common/Layout";
import useClassroomModal from "@/hooks/useClassroomModal";
import { useDispatch } from "react-redux";
import { setModalVisibility } from "@/redux/slice/classroomModalSlice";

interface Comment {
  text: string;
  replies: string[];
}

interface CommentsSectionProps {
  role: string;
  comments: Comment[];
  handleComment: (comment: string) => void;
  setActiveCommentIndex: (index: number) => void;
}

const CommentsSection: FC<CommentsSectionProps> = ({
  role,
  comments,
  handleComment,
  setActiveCommentIndex,
}) => {
  const dispatch = useDispatch();
  const { commentModalOpen } = useClassroomModal();

  return (
    <ul>
      {comments.map((comment, index) => (
        <li
          key={index}
          className="cursor-pointer rounded-md m-3"
          onClick={() => {
            setActiveCommentIndex(index);
            dispatch(
              setModalVisibility({
                modalName: "replyCommentModalOpen",
                visible: true,
              }),
            );
          }}
        >
          <Comment
            admin={role}
            username="예시"
            role="수강생"
            comment={comment.text}
          />
        </li>
      ))}

      {commentModalOpen && (
        <Layout>
          <h2 className="text-xl font-bold">댓글 달기</h2>
          <CommentForm handleComment={handleComment} />
        </Layout>
      )}
    </ul>
  );
};

export default CommentsSection;
