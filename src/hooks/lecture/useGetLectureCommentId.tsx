import { db } from "@/utils/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

/**
 * 특정 강의에 대한 댓글의 문서 ID를 가져오는 비동기 함수
 * @param {string} lectureId
 * @param {string} content
 * @returns {Promise<string | null>}
 */
const useGetLectureCommentId = async (
  lectureId: string,
  content: string,
): Promise<string | null> => {
  const q = query(
    collection(db, "lectureComments"),
    where("lectureId", "==", lectureId),
    where("content", "==", content),
  );
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    const commentId = querySnapshot.docs[0].id;
    return commentId;
  }

  return null;
};

export default useGetLectureCommentId;
