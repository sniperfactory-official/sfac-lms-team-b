import React, { FC } from "react";

import CommentsSection from "@/components/lecture/CommentsSection";
import ReplySection from "../classroomModal/comment/ReplySection";
import { useLectureComment } from "@/hooks/useLectureComment";
import { useDispatch } from "react-redux";
import { setModalVisibility } from "../../redux/slice/classroomModalSlice";

const LectureComment: FC = () => {
  const dispatch = useDispatch();
  const {
    comments,
    activeCommentIndex,
    handleComment,
    handleReply,
    setActiveCommentIndex,
  } = useLectureComment();

  return (
    <section className="CommunityContainer bg-gray-100 w-1/4 float-right h-full">
      <header className=" m-3 flex content-center justify-between items-center">
        <h1 className="text-center text-xl font-semibold pl-2">
          강의 커뮤니티
        </h1>
        <button
          className=" m-5 h-11 w-28 text-white rounded-md bg-blue-600 hover:bg-white hover:border hover:border-blue-600 hover:text-blue-600"
          onClick={() =>
            dispatch(
              setModalVisibility({
                modalName: "commentModalOpen",
                visible: true,
              }),
            )
          }
        >
          작성
        </button>
      </header>
      <main>
        <CommentsSection
          role={"수강생"}
          comments={comments}
          setActiveCommentIndex={setActiveCommentIndex}
          handleComment={handleComment}
        />

        {activeCommentIndex !== null && (
          <ReplySection
            role={"관리자"}
            activeComment={comments[activeCommentIndex]}
            handleReply={handleReply}
          />
        )}
      </main>
    </section>
  );
};

export default LectureComment;
