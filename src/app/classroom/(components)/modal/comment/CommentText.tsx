import React, { ReactNode } from "react";

interface CommentTextProps {
  displayedComment: ReactNode;
}

const CommentText: React.FC<CommentTextProps> = ({ displayedComment }) => (
  <div className="max-w-full">
    <p className=" text-sm text-gray-800 break-all whitespace-pre-wrap">
      {displayedComment}
    </p>
  </div>
);

export default CommentText;
