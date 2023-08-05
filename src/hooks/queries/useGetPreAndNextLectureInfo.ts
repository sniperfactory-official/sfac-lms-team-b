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

async function getValidLectureId(
  courseId: string,
  comparator: "<" | ">",
  currentOrder: number,
) {
  let order = currentOrder;
  let lectureId = null;

  while (!lectureId) {
    const q = query(
      collection(db, "lectures"),
      where("courseId", "==", courseId),
      where("order", comparator, order),
      comparator === "<" ? orderBy("order", "desc") : orderBy("order"),
      limit(1),
    );
    const snapshot = await getDocs(q);

    if (snapshot.empty) break; // No more lectures in this direction

    const doc = snapshot.docs[0];
    const data = doc.data();

    if (!data.isPrivate) {
      lectureId = doc.id;
      break;
    }

    order = data.order;
  }

  return lectureId;
}

function useGetPreAndNextLectureInfo(lectureId: string) {
  return useQuery(["lectureNavigation", lectureId], async () => {
    const lectureSnap = await getDoc(doc(db, "lectures", lectureId));
    const data = lectureSnap.data() as { courseId: string; order: number };
    const { courseId, order: currentOrder } = data;

    const prevLectureId = await getValidLectureId(courseId, "<", currentOrder);
    const nextLectureId = await getValidLectureId(courseId, ">", currentOrder);

    return { prevLectureId, nextLectureId };
  });
}

export default useGetPreAndNextLectureInfo;
