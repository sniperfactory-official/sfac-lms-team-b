import { User } from "@/types/firebase.Types";
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

const useGetLectureReplies = async (
  parentId: string,
): Promise<DocumentData[]> => {
  try {
    const q = query(
      collection(db, "lectureComments"),
      where("parentId", "==", parentId),
    );
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const repliesPromises = querySnapshot.docs.map(async doc => {
        const replyData = doc.data();
        const userSnap = await getDoc(replyData.userId);
        const user = userSnap.data() as User;
        return { ...replyData, user };
      });

      const replies = await Promise.all(repliesPromises);
      return replies;
    } else {
      return [];
    }
  } catch (error) {
    console.error("답글 정보 가져오기 오류:", error);
    return [];
  }
};

export default useGetLectureReplies;
