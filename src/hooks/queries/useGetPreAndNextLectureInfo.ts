import { useQuery } from "@tanstack/react-query";
import { db } from "@/utils/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";

function useGetPreAndNextLectureInfo(lectureId: string) {
  return useQuery(["lectureNavigation", lectureId], async () => {
    const lectureSnap = await getDoc(doc(db, "lectures", lectureId));

    const data = lectureSnap.data() as { courseId: string; order: number };
    const { courseId, order: currentOrder } = data;

    const prevLectureQuery = query(
      collection(db, "lectures"),
      where("courseId", "==", courseId),
      where("order", "<", currentOrder),
      orderBy("order", "desc"),
      limit(1),
    );
    const prevLectureSnapshot = await getDocs(prevLectureQuery);
    const prevLectureId = prevLectureSnapshot.docs[0]?.id || null;

    const nextLectureQuery = query(
      collection(db, "lectures"),
      where("courseId", "==", courseId),
      where("order", ">", currentOrder),
      orderBy("order"),
      limit(1),
    );
    const nextLectureSnapshot = await getDocs(nextLectureQuery);
    const nextLectureId = nextLectureSnapshot.docs[0]?.id || null;

    return { prevLectureId, nextLectureId };
  });
}

export default useGetPreAndNextLectureInfo;
