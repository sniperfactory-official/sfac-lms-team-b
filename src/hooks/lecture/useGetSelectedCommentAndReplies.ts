import { useLectureCommentContext } from "@/app/classroom/(components)/contexts/LectureCommentContext";
import useGetAllComments from "@/hooks/queries/useGetAllComments";

export default function useGetSelectedCommentAndReplies(lectureId: string) {
  const { selectedCommentId } = useLectureCommentContext();
  const { data: comments } = useGetAllComments(lectureId);

  const getSelectedCommentAndReplies = () => {
    if (!selectedCommentId || !comments) return { comment: null, replies: [] };
    const selectedComment = comments.find(
      comment => comment.id === selectedCommentId,
    );
    const replies = comments.filter(
      reply => reply.parentId === selectedCommentId,
    );
    return { comment: selectedComment, replies };
  };

  return getSelectedCommentAndReplies();
}
