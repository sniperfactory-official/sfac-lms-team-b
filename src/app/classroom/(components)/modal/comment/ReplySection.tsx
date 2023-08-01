import React, { FC } from "react";

import CommentForm from "./CommentForm";
import Comment from "./Comment";
import Layout from "../common/Layout";
import useClassroomModal from "@/hooks/lecture/useClassroomModal";
import useGetComments from "@/hooks/queries/useGetComments";

interface ReplySectionProps {
  commentId: string;
  lectureId: string;
}
const ReplySection: FC<ReplySectionProps> = ({ commentId, lectureId }) => {
  const { replyCommentModalOpen } = useClassroomModal();
  const { data: comment } = useGetComments(undefined, undefined, commentId);
  const { data: replies } = useGetComments(undefined, commentId, undefined);

  return (
    replyCommentModalOpen && (
      <Layout>
        <h2 className="text-2xl font-bold">상세보기</h2>
        {comment && comment[0] && (
          <Comment comment={comment[0]} showFullComment={true} />
        )}
        <ul>
          {replies &&
            replies.map((reply, index) => (
              <li key={index} className="mt-2">
                <Comment
                  comment={reply}
                  showFullComment={true}
                  isReply={true}
                />
              </li>
            ))}
        </ul>
        <CommentForm
          parentId={commentId}
          lectureId={lectureId}
          isReply={true}
        />
      </Layout>
    )
  );
};

export default ReplySection;
