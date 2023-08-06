import { LectureComment, User } from "@/types/firebase.types";
import { useQuery } from "@tanstack/react-query";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  orderBy,
} from "firebase/firestore";
import { db } from "@/utils/firebase";

const useGetAllComments = (lectureId: string) => {
  return useQuery<LectureComment[]>(["comments", lectureId], async () => {
    const lectureIdRef = doc(db, "lectures", lectureId);

    const commentsQuery = query(
      collection(db, "lectureComments"),
      where("lectureId", "==", lectureIdRef),
      orderBy("createdAt"),
    );

    const querySnapshot = await getDocs(commentsQuery);

    const commentsWithUsers = await Promise.all(
      querySnapshot.docs.map(async commentDoc => {
        const data = commentDoc.data() as Omit<LectureComment, "id">;

        const userRef = data.userId;
        const userSnapshot = await getDoc(userRef);
        if (userSnapshot.exists()) {
          const user = userSnapshot.data() as User;
          return { id: commentDoc.id, ...data, user };
        } else {
          return null;
        }
      }),
    );

    return commentsWithUsers.filter(
      comment => comment !== null,
    ) as LectureComment[];
  });
};

export default useGetAllComments;
