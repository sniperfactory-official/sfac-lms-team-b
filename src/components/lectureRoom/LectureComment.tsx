import React, { FC, useState } from "react";
import { useDispatch } from "react-redux";
import {
  setModalVisibility,
  setLectureId,
} from "@/redux/slice/classroomModalSlice";
import ReplySection from "@/components/classroomModal/comment/ReplySection";
import CommentsSection from "@/components/lectureRoom/CommentsSection";
import useGetComments from "@/hooks/lecture/useGetComments";

interface LectureCommentProps {
  lectureId: string;
}

const LectureComment: FC<LectureCommentProps> = ({ lectureId }) => {
  const { data, isLoading } = useGetComments(lectureId);
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
    dispatch(setLectureId(lectureId));
    dispatch(
      setModalVisibility({ modalName: "commentModalOpen", visible: true }),
    );
  };

  if (isLoading) return <div className="w-full h-full">Loading...</div>;

  return (
    <section className="CommunityContainer bg-gray-100 w-1/4 float-right h-full">
      <header className="m-3 flex content-center justify-between items-center">
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
      <main>
        <CommentsSection comments={data} onCommentClick={handleCommentClick} />
        {selectedCommentId && <ReplySection commentId={selectedCommentId} />}
      </main>
    </section>
  );
};

export default LectureComment;
