import { LectureComment, User } from "@/types/firebase.Types";
import { db } from "@/utils/firebase";
import { useQuery } from "@tanstack/react-query";
import {
  DocumentData,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

/**
 * 특정 강의에 대한 댓글들을 가져오는 비동기 함수
 * @param {string} docId - 강의 문서 ID
 * @returns {Promise<DocumentData[]>} - 댓글들을 담은 배열
 */
const fetchLectureComments = async (docId: string): Promise<DocumentData[]> => {
  const q = query(
    collection(db, "lectureComments"),
    where("lectureId", "==", doc(db, "lectures", docId)),
  );
  const lectureComments: DocumentData[] = [];
  const querySnapshot = await getDocs(q);

  for (const doc of querySnapshot.docs) {
    const docData = doc.data();
    const userSnap = await getDoc(docData.userId);
    const user = userSnap.data() as User;

    lectureComments.push({ ...docData, user });
  }

  return lectureComments;
};

/**
 * 특정 강의에 대한 댓글들을 가져오는 React Query Hook
 * @param {string} docId - 강의 문서 ID
 * @returns {Query} - React Query Hook을 반환
 */
const useGetLectureComments = (docId: string) => {
  return useQuery(
    ["LectureComment", docId],
    async () => await fetchLectureComments(docId),
    { refetchOnWindowFocus: false },
  );
};

export default useGetLectureComments;
