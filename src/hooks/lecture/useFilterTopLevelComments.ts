import { LectureComment } from "@/types/firebase.types";

const useFilterTopLevelComments = (
  lectureComments?: LectureComment[],
): LectureComment[] => {
  return lectureComments
    ? lectureComments.filter(
        comment => !comment.parentId || comment.parentId === "",
      )
    : [];
};

export default useFilterTopLevelComments;
