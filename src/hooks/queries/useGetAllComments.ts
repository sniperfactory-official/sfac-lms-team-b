import { LectureComment, User } from "@/types/firebase.types";
import { useQuery } from "@tanstack/react-query";
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  doc,
  DocumentData,
  orderBy,
  DocumentReference,
} from "firebase/firestore";
import { db } from "@/utils/firebase";

async function fetchUsersByRefs(
  userRefs: DocumentReference<DocumentData, DocumentData>[],
) {
  const users: Record<string, User> = {};

  const userDocs = await Promise.all(userRefs.map(userRef => getDoc(userRef)));

  userDocs.forEach((userDoc, index) => {
    if (userDoc.exists()) {
      users[userRefs[index].id] = userDoc.data() as User;
    }
  });

  return users;
}

const useGetAllComments = (lectureId: string) => {
  return useQuery<LectureComment[]>(["comments", lectureId], async () => {
    const lectureIdRef = doc(db, "lectures", lectureId);

    const commentsQuery = query(
      collection(db, "lectureComments"),
      where("lectureId", "==", lectureIdRef),
      orderBy("createdAt"),
    );

    const querySnapshot = await getDocs(commentsQuery);
    const userRefs: DocumentReference<DocumentData, DocumentData>[] = [];
    const userRefSet = new Set<string>();

    querySnapshot.docs.forEach(commentDoc => {
      const data = commentDoc.data();
      if (data.userId && !userRefSet.has(data.userId.id)) {
        userRefSet.add(data.userId.id);
        userRefs.push(data.userId);
      }
    });

    const users = await fetchUsersByRefs(userRefs);

    return querySnapshot.docs.map(commentDoc => {
      const data = commentDoc.data() as Omit<LectureComment, "id">;
      const user = users[data.userId.id];
      return { id: commentDoc.id, ...data, user };
    });
  });
};

export default useGetAllComments;
