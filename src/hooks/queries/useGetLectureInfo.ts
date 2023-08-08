import type { Lecture, User } from "@/types/firebase.types";
import { db } from "@/utils/firebase";
import { useQuery } from "@tanstack/react-query";
import { getDoc, doc } from "firebase/firestore";

const fetchLectureInfo = async (docId: string) => {
  const lectureRef = doc(db, "lectures", docId);
  const lectureSnap = await getDoc(lectureRef);

  if (!lectureSnap.exists()) {
    throw new Error(`Lecture with ID ${docId} doesn't exist.`);
  }

  const lectureData = lectureSnap.data();

  if (lectureData && "userId" in lectureData && lectureData.userId) {
    const userSnap = await getDoc(lectureData.userId);
    if (!userSnap.exists()) {
      throw new Error(`User for lecture ID ${docId} doesn't exist.`);
    }
    const user = userSnap.data() as User;
    return { id: docId, ...lectureData, user } as Lecture;
  }

  return { id: docId, ...lectureData } as Lecture;
};

const useGetLectureInfo = (docId: string) => {
  return useQuery<Lecture>(["lecture", docId], () => fetchLectureInfo(docId), {
    refetchOnWindowFocus: false,
  });
};

export default useGetLectureInfo;
