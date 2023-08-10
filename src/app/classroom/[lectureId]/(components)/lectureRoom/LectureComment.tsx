import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { setModalVisibility } from "@/redux/slice/classroomModalSlice";
import useGetAllComments from "@/hooks/queries/useGetAllComments";
import useFilterTopLevelComments from "@/hooks/lecture/useFilterTopLevelComments";
import useGetSelectedCommentAndReplies from "@/hooks/lecture/useGetSelectedCommentAndReplies";

import LectureCommentHeader from "./LectureCommentHeader";
import ReplySection from "@/app/classroom/(components)/modal/comment/ReplySection";
import CommentsSection from "@/app/classroom/[lectureId]/(components)/lectureRoom/CommentsSection";
import CommentForm from "@/app/classroom/(components)/modal/comment/CommentForm";
import Layout from "@/app/classroom/(components)/modal/common/Layout";
import useClassroomModal from "@/hooks/lecture/useClassroomModal";
import { useLectureCommentContext } from "@/app/classroom/(components)/contexts/LectureCommentContext";
import { Text } from "sfac-designkit-react";

interface LectureCommentProps {
  lectureId: string;
}

const LectureComment: FC<LectureCommentProps> = ({ lectureId }) => {
  const { selectedCommentId, setSelectedCommentId } =
    useLectureCommentContext();
  const { data: comments, isLoading, isError } = useGetAllComments(lectureId);
  const dispatch = useDispatch();
  const { commentModalOpen } = useClassroomModal();

  const handleCommentClick = (id: string) => {
    setSelectedCommentId(id);
    dispatch(
      setModalVisibility({
        modalName: "replyCommentModalOpen",
        visible: true,
        modalRole: "create",
      }),
    );
  };

  const handleButtonClick = () => {
    dispatch(
      setModalVisibility({
        modalName: "commentModalOpen",
        visible: true,
        modalRole: "create",
      }),
    );
  };

  const topLevelComments = useFilterTopLevelComments(comments);
  const { comment, replies } = useGetSelectedCommentAndReplies(lectureId);

  return (
    <section className="CommunityContainer bg-gray-100 w-1/4 float-right h-full">
      <LectureCommentHeader onButtonClick={handleButtonClick} />
      <main className="overflow-y-auto h-5/6 pb-[50px]">
        {isLoading ? (
          <div>Loading...</div>
        ) : isError ? (
          <div>Error loading comments</div>
        ) : (
          <CommentsSection
            onCommentClick={handleCommentClick}
            comments={topLevelComments}
          />
        )}
        {selectedCommentId && (
          <ReplySection
            comment={comment || null}
            replies={replies}
            lectureId={lectureId}
          />
        )}
        {commentModalOpen && (
          <Layout>
            <Text size="xl" weight="semibold">
              댓글 달기
            </Text>
            <CommentForm lectureId={lectureId} isReply={false} />
          </Layout>
        )}
      </main>
    </section>
  );
};

export default LectureComment;
