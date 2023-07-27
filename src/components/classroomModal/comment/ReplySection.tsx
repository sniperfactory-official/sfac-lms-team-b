import React, { FC } from "react";
import CommentForm from "./CommentForm";
import Comment from "./Comment";
import Layout from "../common/Layout";
import useClassroomModal from "@/hooks/useClassroomModal";

interface Comment {
  text: string;
  replies: string[];
}

interface ReplySectionProps {
  role: string;
  activeComment: Comment | null;
  handleReply: (reply: string) => void;
}

const ReplySection: FC<ReplySectionProps> = ({
  role,
  activeComment,
  handleReply,
}) => {
  const { replyCommentModalOpen } = useClassroomModal();

  return (
    activeComment &&
    replyCommentModalOpen && (
      <Layout>
        <h2 className="text-2xl font-bold">상세보기</h2>
        <Comment
          admin={role}
          username="예시"
          role="수강생"
          comment={activeComment.text}
          showFullComment={true}
        />
        <ul>
          {activeComment.replies.map((reply, index) => (
            <li key={index} className="mt-2">
              <Comment
                admin={role}
                username="예시"
                role="수강생"
                comment={reply}
                showFullComment={true}
              />
            </li>
          ))}
        </ul>
        <CommentForm
          handleComment={reply => {
            handleReply(reply);
          }}
        />
      </Layout>
    )
  );
};

export default ReplySection;
