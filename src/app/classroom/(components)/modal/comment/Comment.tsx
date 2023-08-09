import Image from "next/image";
import { DocumentData } from "firebase/firestore";
import { VideoRefContext } from "@/app/classroom/(components)/contexts/VideoContext";
import React, { useState, useContext } from "react";
import { getTime } from "@/utils/getTime";
import useUser from "@/hooks/user/useUser";
import { useDeleteComment } from "@/hooks/mutation/useDeleteComment";
import { useUpdateComment } from "@/hooks/mutation/useUpdateComment";
import { useDisplayedComment } from "@/hooks/lecture/useDisplayedComment";
import { useHandleClicks } from "@/hooks/lecture/useHandleClicks";
import EditDeleteButtons from "./EditDeleteButtons";
import ReplyCount from "./ReplyCount";
import EditComment from "./EditComment";
import ReadComment from "./ReadComment";

interface CommentProps {
  comment: DocumentData;
  showFullComment?: boolean;
  isReply?: boolean;
  onCommentClick?: (id: string) => void;
  onReplyClick?: (username: string) => void;
}

const Comment: React.FC<CommentProps> = ({
  comment,
  showFullComment = false,
  isReply = false,
  onCommentClick,
  onReplyClick,
}) => {
  const { id, content, createdAt, parentId, replyCount } = comment;
  const { username, role, profileImage } = comment.user;
  const userId = comment.userId;

  const { user } = useUser();
  const { videoRef } = useContext(VideoRefContext);

  const deleteMutation = useDeleteComment();
  const updateMutation = useUpdateComment();

  const displayedComment = useDisplayedComment(
    showFullComment,
    content,
    videoRef,
  );

  const { handleCommentClick, handleDeleteClick } = useHandleClicks(
    onCommentClick,
    deleteMutation,
  );

  const time = getTime(createdAt.toDate());

  const [isEditMode, setIsEditMode] = useState(false);

  const handleEdit = (newContent: string) => {
    updateMutation.mutate({
      id,
      newContent,
    });
    setIsEditMode(false);
  };

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
        {isEditMode ? (
          <EditComment
            content={content}
            username={username}
            role={role}
            profileImage={profileImage}
            onEdit={handleEdit}
            onCancel={() => setIsEditMode(false)}
          />
        ) : (
          <ReadComment
            profileImage={profileImage}
            displayedComment={displayedComment}
            username={username}
            role={role}
          />
        )}
        {!isEditMode && (
          <div className="flex flex-col space-y-2 text-sm w-3/12">
            <div className="w-full">
              {showFullComment ? (
                <EditDeleteButtons
                  showFullComment={showFullComment}
                  userId={userId.id}
                  userUid={user?.uid}
                  handleDeleteClick={e => handleDeleteClick(e, id)}
                  setIsEditMode={setIsEditMode}
                />
              ) : (
                <ReplyCount replyCount={replyCount} />
              )}
            </div>
            {showFullComment && userId.id !== user?.uid && (
              <div className="space-x-2 text-black">
                <button
                  className="float-right text-xs hover:text-blue-500 cursor-pointer"
                  onClick={event => {
                    event.stopPropagation();
                    onReplyClick && onReplyClick(username);
                  }}
                >
                  답글달기
                </button>
              </div>
            )}
            <div className="text-gray-400 space-x-2">
              <span className="float-right text-xs">{time}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;
