import { User } from "@/types/firebase.types";
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
 * @param {string} lectureId
 * @param {string} parentId
 * @param {string} commentId
 * @returns {Promise<DocumentData[]>}
 */
const fetchComments = async (
  lectureId?: string,
  parentId?: string,
  commentId?: string,
): Promise<DocumentData[]> => {
  if (lectureId) {
    const commentsQuery = query(
      collection(db, "lectureComments"),
      where("lectureId", "==", doc(db, "lectures", lectureId)),
    );
    const querySnapshot = await getDocs(commentsQuery);

    const comments: DocumentData[] = await Promise.all(
      querySnapshot.docs.map(async doc => {
        const docData = doc.data();
        const commentId = doc.id;
        const userSnap = await getDoc(docData.userId);
        const user = userSnap.data() as User;
        const userId = docData.userId.id;

        return { id: commentId, ...docData, user, userId };
      }),
    );

    return comments;
  } else if (parentId) {
    const commentsQuery = query(
      collection(db, "lectureComments"),
      where("parentId", "==", parentId),
    );
    const querySnapshot = await getDocs(commentsQuery);

    const comments: DocumentData[] = await Promise.all(
      querySnapshot.docs.map(async doc => {
        const docData = doc.data();
        const commentId = doc.id;
        const userSnap = await getDoc(docData.userId);
        const user = userSnap.data() as User;

        return { id: commentId, ...docData, user };
      }),
    );

    return comments;
  } else if (commentId) {
    const commentDoc = doc(db, "lectureComments", commentId);
    const commentSnap = await getDoc(commentDoc);

    if (commentSnap.exists()) {
      const docData = commentSnap.data();
      const userSnap = await getDoc(docData.userId);
      const user = userSnap.data() as User;

      return [{ id: commentId, ...docData, user }];
    } else {
      return [];
    }
  } else {
    throw new Error("Id 값이 제대로 들어왔는지 확인해주세요.");
  }
};

/**
 * @param {string} lectureId
 * @param {string} parentId
 * @param {string} commentId
 * @returns {Object}
 */
const useGetComments = (
  lectureId?: string,
  parentId?: string,
  commentId?: string,
) => {
  return useQuery(
    ["comments", lectureId, parentId, commentId],
    () => fetchComments(lectureId, parentId, commentId),
    { refetchOnWindowFocus: false },
  );
};

export default useGetComments;
