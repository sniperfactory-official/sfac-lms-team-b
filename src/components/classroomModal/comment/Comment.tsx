import Image from "next/image";
import { DocumentData } from "firebase/firestore";
import React from "react";
import { getTime } from "@/utils/getTime";
import timestampToDate from "@/utils/timestampToDate";

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
  const { id, content, createdAt, updatedAt, parentId } = comment;
  const { username, role, userId } = comment.user;

  const displayedComment =
    !showFullComment && content.length > 10
      ? `${content.slice(0, 10)}...`
      : content;

  const time = getTime(new Date(timestampToDate(createdAt)));

  const handleCommentClick = () => {
    if (onCommentClick) {
      onCommentClick(id);
    }
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
        onClick={handleCommentClick}
      >
        <div className="flex items-center space-x-4">
          {/* 이미지 들어가는 곳 */}
          <div className="w-10 h-10 bg-white border border-gray-300 rounded-full flex-shrink-0"></div>
          {/* 유저이름과 역할, 내용 */}
          <div className="flex flex-col">
            <div className="flex items-center mb-1">
              <span className="font-semibold ">{username}</span>
              <span className="text-sm ml-1 text-gray-400 font-light">
                &#183; {role}
              </span>
            </div>
            <div className="max-w-full">
              <p className=" text-sm text-gray-800 break-all whitespace-pre-wrap">
                {displayedComment}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col space-y-2 float-right text-sm w-3/12 p-2">
          <div className="w-full">
            {/* 관리자나 작성자가 들어올 경우 보여지기 */}
            {userId === "로그인한 유저 아이디" ? (
              <ul className="flex text-xs space-x-1.5 text-gray-400 float-right pt-2">
                <li className="text-black hover:text-blue-500 cursor-pointer">
                  수정
                </li>
                <li>|</li>
                <li className="text-black hover:text-red cursor-pointer">
                  삭제
                </li>
              </ul>
            ) : (
              <div className="text-gray-400 text-xs space-x-2 float-right">
                <span>답글 0</span>
              </div>
            )}
          </div>
          {/* 날짜 처리 */}
          <div className="text-gray-400 space-x-2 float-right">
            <span className="float-right text-xs">{time}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
