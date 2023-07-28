import React, { FC, useState, useEffect } from "react";

import { DocumentData } from "firebase/firestore";
import CommentForm from "./CommentForm";
import Comment from "./Comment";
import Layout from "../common/Layout";
import useClassroomModal from "@/hooks/useClassroomModal";

import useGetLectureReplies from "@/hooks/lecture/useGetLectureReplies";
import useGetLectureReply from "@/hooks/lecture/useGetLectureReply";

interface ReplySectionProps {
  commentId: string;
}

const ReplySection: FC<ReplySectionProps> = ({ commentId }) => {
  const { replyCommentModalOpen } = useClassroomModal();
  const [comment, setComment] = useState<DocumentData | null>(null);
  const [replies, setReplies] = useState<DocumentData[]>([]);

  useEffect(() => {
    const fetchCommentAndReplies = async () => {
      const commentResult = await useGetLectureReply(commentId);
      const repliesResult = await useGetLectureReplies(commentId);
      setComment(commentResult);
      setReplies(repliesResult);
    };

    fetchCommentAndReplies();
  }, [commentId]);

  return (
    replyCommentModalOpen && (
      <Layout>
        <h2 className="text-2xl font-bold">상세보기</h2>
        {comment && <Comment comment={comment} showFullComment={true} />}
        <ul>
          {replies.map((reply, index) => (
            <li key={index} className="mt-2">
              <Comment comment={reply} showFullComment={true} />
            </li>
          ))}
        </ul>
        <CommentForm />
      </Layout>
    )
  );
};

export default ReplySection;
