import Image from "next/image";
import { DocumentData } from "firebase/firestore";
import React from "react";
import { getTime } from "@/utils/getTime";
import useAuth from "@/hooks/user/useAuth";
import { useDeleteComment } from "@/hooks/mutation/useDeleteComment";
import { useDisplayedComment } from "@/hooks/lecture/useDisplayedComment";
import { useHandleClicks } from "@/hooks/lecture/useHandleClicks";
import UserImage from "./UserImage";
import UserInfo from "./UserInfo";
import CommentText from "./CommentText";
import EditDeleteButtons from "./EditDeleteButtons";
import ReplyCount from "./ReplyCount";

interface CommentProps {
  comment: DocumentData;
  showFullComment?: boolean;
  isReply?: boolean;
  onCommentClick?: (id: string) => void;
}

const Comment: React.FC<CommentProps> = ({
  comment,
  showFullComment = false,
  isReply = false,
  onCommentClick,
}) => {
  const { id, content, createdAt, parentId, replyCount } = comment;
  const { username, role } = comment.user;
  const userId = comment.userId;

  const user = useAuth();

  const deleteMutation = useDeleteComment();

  const displayedComment = useDisplayedComment(showFullComment, content);

  const { handleCommentClick, handleDeleteClick } = useHandleClicks(
    onCommentClick,
    deleteMutation,
  );

  const time = getTime(createdAt.toDate());

  return (
    <div className="flex items-start space-x-2 w-full h-30">
      {isReply && (
        <div className="flex items-center justify-center h-20">
          <Image src="/images/vector.svg" alt="답글" width={15} height={15} />
        </div>
      )}
      <div
        className="w-full h-30 p-5 rounded-lg bg-white border border-gray-300  flex space-x-4 items-start justify-between"
        onClick={() => handleCommentClick(id)}
      >
        <div className="flex items-center space-x-4">
          <UserImage />
          <div className="flex flex-col">
            <UserInfo username={username} role={role} />
            <CommentText displayedComment={displayedComment} />
          </div>
        </div>
        <div className="flex flex-col space-y-2 float-right text-sm w-3/12 p-2">
          <div className="w-full">
            <EditDeleteButtons
              showFullComment={showFullComment}
              userId={userId}
              userUid={user?.uid}
              handleDeleteClick={e => handleDeleteClick(e, id)}
            />
            <ReplyCount replyCount={replyCount} />
          </div>
          <div className="text-gray-400 space-x-2 float-right">
            <span className="float-right text-xs">{time}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
