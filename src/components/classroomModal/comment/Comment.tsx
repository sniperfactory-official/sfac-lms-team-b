import React from "react";

interface CommentProps {
  admin: string;
  username: string;
  role: string;
  comment: string;
  showFullComment?: boolean;
}

const Comment: React.FC<CommentProps> = ({
  admin,
  username,
  role,
  comment,
  showFullComment = false,
}) => {
  const displayedComment =
    !showFullComment && comment.length > 10
      ? `${comment.slice(0, 10)}...`
      : comment;

  return (
    <div className="w-full h-30 p-5 rounded-lg bg-white border border-gray-300  flex space-x-4 items-start justify-between">
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
          {admin === "관리자" ? (
            <ul className="flex text-xs space-x-1.5 text-gray-400 float-right pt-2">
              <li className="text-black hover:text-blue-500 cursor-pointer">
                수정
              </li>
              <li>|</li>
              <li className="text-black hover:text-red cursor-pointer">삭제</li>
            </ul>
          ) : (
            <div className="text-gray-400 text-xs space-x-2 float-right">
              <span>답글 0</span>
            </div>
          )}
        </div>
        {/* 날짜 처리 */}
        <div className="text-gray-400 space-x-2 float-right">
          <span className="float-right text-xs">3일전</span>
        </div>
      </div>
    </div>
  );
};

export default Comment;
