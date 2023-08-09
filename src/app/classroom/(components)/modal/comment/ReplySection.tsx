import { LectureComment } from "@/types/firebase.types";
import React, { FC, useState, useEffect } from "react";
import CommentForm from "./CommentForm";
import Comment from "./Comment";
import Layout from "../common/Layout";
import useClassroomModal from "@/hooks/lecture/useClassroomModal";

interface ReplySectionProps {
  comment: LectureComment | null;
  replies: LectureComment[];
  lectureId: string;
}

const ReplySection: FC<ReplySectionProps> = ({
  comment,
  replies,
  lectureId,
}) => {
  const { replyCommentModalOpen } = useClassroomModal();
  const [initialContent, setInitialContent] = useState<string | undefined>("");

  const handleReplyClick = (username: string) => {
    setInitialContent(`@${username} `);
  };

  useEffect(() => {
    if (!replyCommentModalOpen) {
      setInitialContent(undefined);
    }
  }, [replyCommentModalOpen]);

  return (
    replyCommentModalOpen && (
      <Layout>
        <h2 className="text-2xl font-bold">상세보기</h2>
        {comment && (
          <Comment
            comment={comment}
            showFullComment={true}
            onReplyClick={handleReplyClick}
          />
        )}
        <ul className="max-h-[250px] overflow-y-scroll">
          {replies.map((reply, index) => (
            <li key={index} className="mt-2">
              <Comment
                comment={reply}
                showFullComment={true}
                isReply={true}
                onReplyClick={handleReplyClick}
              />
            </li>
          ))}
        </ul>
        <CommentForm
          parentId={comment?.id || ""}
          lectureId={lectureId}
          isReply={true}
          initialContent={initialContent}
          modalOpen={replyCommentModalOpen}
        />
      </Layout>
    )
  );
};

export default ReplySection;
