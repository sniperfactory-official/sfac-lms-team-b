import { User } from "@/types/firebase.types";
import { db } from "@/utils/firebase";
import {
  collection,
  getDocs,
  getDoc,
  query,
  where,
  DocumentData,
} from "firebase/firestore";

/**
 * 특정 댓글에 대한 답글을 가져오는 비동기 함수
 * @param {string} commentId - 댓글 문서 ID
 * @returns {Promise<DocumentData | null>} - 답글 문서 데이터를 반환, 해당하는 답글이 없으면 null 반환
 */
const useGetLectureReply = async (
  commentId: string,
): Promise<DocumentData | null> => {
  try {
    const q = query(
      collection(db, "lectureComments"),
      where("lectureCommentId", "==", commentId),
    );
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const commentData = querySnapshot.docs[0].data();
      const userSnap = await getDoc(commentData.userId);
      const user = userSnap.data() as User;
      return { ...commentData, user };
    } else {
      return null;
    }
  } catch (error) {
    console.error("답글 정보 가져오기 오류:", error);
    return null;
  }
};

export default useGetLectureReply;
