import React from "react";

interface ReplyCountProps {
  replyCount: number;
}

const ReplyCount: React.FC<ReplyCountProps> = ({ replyCount }) => (
  <div className="text-gray-400 text-xs space-x-2 float-right">
    <span>답글 {replyCount}</span>
  </div>
);

export default ReplyCount;
