import { db } from "@/utils/firebase";
import { useQuery } from "@tanstack/react-query";
import { getDocs, query, where, collection, doc } from "firebase/firestore";
import type { Progress } from "@/types/firebase.types";

const fetchProgressInfo = async (userId: string, lectureId: string) => {
  const userRef = doc(db, "users", userId);
  const lectureRef = doc(db, "lectures", lectureId);

  const progressQuery = query(
    collection(db, "progress"),
    where("userId", "==", userRef),
    where("lectureId", "==", lectureRef),
  );

  const progressSnap = await getDocs(progressQuery);

  if (progressSnap.empty) {
    return { hasData: false, data: null };
  }

  return { hasData: true, data: progressSnap.docs[0].data() as Progress };
};

const useGetProgressInfo = (userId: string, lectureId: string) => {
  return useQuery<{ hasData: boolean; data: Progress | null }>(
    ["progress", userId, lectureId],
    () => fetchProgressInfo(userId, lectureId),
    {
      refetchOnWindowFocus: false,
    },
  );
};

export default useGetProgressInfo;
