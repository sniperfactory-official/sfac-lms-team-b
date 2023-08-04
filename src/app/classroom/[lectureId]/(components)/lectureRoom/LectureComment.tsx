import React, { FC, useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { setModalVisibility } from "@/redux/slice/classroomModalSlice";
import ReplySection from "@/app/classroom/(components)/modal/comment/ReplySection";
import CommentsSection from "@/app/classroom/[lectureId]/(components)/lectureRoom/CommentsSection";

interface LectureCommentProps {
  lectureId: string;
}

const LectureComment: FC<LectureCommentProps> = ({ lectureId }) => {
  const [selectedCommentId, setSelectedCommentId] = useState<string | null>(
    null,
  );
  const dispatch = useDispatch();

  const handleCommentClick = (id: string) => {
    setSelectedCommentId(id);
    dispatch(
      setModalVisibility({ modalName: "replyCommentModalOpen", visible: true }),
    );
  };

  const handleButtonClick = () => {
    dispatch(
      setModalVisibility({ modalName: "commentModalOpen", visible: true }),
    );
  };

  return (
    <section className="CommunityContainer bg-gray-100 w-1/4 float-right h-[740px]">
      <header className="m-3 flex content-center justify-between items-center h-[50px]">
        <h1 className="text-center text-xl font-semibold pl-2">
          강의 커뮤니티
        </h1>
        <button
          className="m-5 h-11 w-28 text-white rounded-md bg-blue-600 hover:bg-white hover:border hover:border-blue-600 hover:text-blue-600"
          onClick={handleButtonClick}
        >
          작성
        </button>
      </header>
      <main className="overflow-y-auto h-[600px] pb-[60px]">
        <CommentsSection
          lectureId={lectureId} 
          onCommentClick={handleCommentClick}
        />
        {selectedCommentId && (
          <ReplySection commentId={selectedCommentId} lectureId={lectureId} />
        )}
      </main>
    </section>
  );
};

export default LectureComment;
