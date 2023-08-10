import { Progress } from "@/types/firebase.types";
import { db } from "@utils/firebase";
import { useQuery } from "@tanstack/react-query";
import {
  getDocs,
  collection,
  query,
  where,
  doc,
  DocumentData,
} from "firebase/firestore";
const fetchUserLectures = async (userId: string, lectureId: string) => {
  const userRef = doc(db, "users", userId);
  const lectureRef = doc(db, "lectures", lectureId);

  const progressQuery = query(
    collection(db, "progress"),
    where("userId", "==", userRef),
    where("lectureId", "==", lectureRef),
  );

  const progressSnap = await getDocs(progressQuery);

  if (progressSnap.empty) {
    return { hasData: false, data: null, id: null };
  }

  const progressDoc = progressSnap.docs[0];
  return {
    hasData: true,
    data: {
      ...progressDoc.data(),
      id: progressDoc.id,
    } as Progress,
  };
};

const useGetProgressInfo = (userId: string, lectureId: string) => {
  return useQuery(
    ["userLectures", userId],
    async () => await fetchUserLectures(userId, lectureId),
    { refetchOnWindowFocus: false },
  );
};

export default useGetProgressInfo;
