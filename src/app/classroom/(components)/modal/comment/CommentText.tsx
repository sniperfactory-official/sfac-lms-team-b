import React, { ReactNode } from "react";
import { Text } from "sfac-designkit-react";

interface CommentTextProps {
  displayedComment: ReactNode;
}
const CommentText: React.FC<CommentTextProps> = ({ displayedComment }) => (
  <div className="max-w-full">
    <Text size="sm" weight="medium">
      {displayedComment}
    </Text>
  </div>
);

export default CommentText;
