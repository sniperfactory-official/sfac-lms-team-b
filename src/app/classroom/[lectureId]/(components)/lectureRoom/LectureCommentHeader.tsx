import React, { FC } from "react";
import { Button, Text } from "sfac-designkit-react";

interface LectureCommentHeaderProps {
  onButtonClick: () => void;
}

const LectureCommentHeader: FC<LectureCommentHeaderProps> = ({
  onButtonClick,
}) => {
  return (
    <header className="m-3 flex content-center justify-between items-center h-[50px]">
      <Text
        size="xl"
        weight="semibold"
        className="text-color-Grayscale-100 pt-1 pl-2"
      >
        강의 커뮤니티
      </Text>
      <Button
        variant="primary"
        text="작성"
        asChild
        className="p-2 h-11 w-28 text-white rounded-md bg-blue-600 hover:bg-white hover:border hover:border-blue-600 hover:text-blue-600"
        onClick={onButtonClick}
      />
    </header>
  );
};

export default LectureCommentHeader;
