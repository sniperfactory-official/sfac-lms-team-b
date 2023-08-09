import React, { FC } from "react";

interface LectureCommentHeaderProps {
  onButtonClick: () => void;
}

const LectureCommentHeader: FC<LectureCommentHeaderProps> = ({
  onButtonClick,
}) => {
  return (
    <header className="m-3 flex content-center justify-between items-center h-[50px]">
      <h1 className="text-center text-xl font-semibold pl-2">강의 커뮤니티</h1>
      <button
        className="m-5 h-11 w-28 text-white rounded-md bg-blue-600 hover:bg-white hover:border hover:border-blue-600 hover:text-blue-600"
        onClick={onButtonClick}
      >
        작성
      </button>
    </header>
  );
};

export default LectureCommentHeader;
