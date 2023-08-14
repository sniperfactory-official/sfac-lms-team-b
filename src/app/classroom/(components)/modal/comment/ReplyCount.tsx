import React from "react";
import { Text } from "sfac-designkit-react";

interface ReplyCountProps {
  replyCount: number;
}
const ReplyCount: React.FC<ReplyCountProps> = ({ replyCount }) => (
  <div className="text-gray-400 text-xs space-x-2 float-right">
    <Text size="xs" weight="medium">
      답글 {replyCount}
    </Text>
    {/* <span>답글 {replyCount}</span> */}
  </div>
);

export default ReplyCount;
