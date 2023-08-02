import { useQuery } from "@tanstack/react-query";
import {
  collection,
  getDoc,
  getDocs,
  doc,
  query,
  where,
  DocumentData,
} from "firebase/firestore";
import { db } from "@utils/firebase";
import { Feedback } from "@/types/firebase.types";

const getFeedbacks = async (submittedAssignmentId: string): Promise<any> => {
  const feedbacksDocs = await getDocs(
    collection(db, "submittedAssignments", submittedAssignmentId, "feedbacks"),
  );

  const sortFeedbacks = feedbacksDocs?.docs.sort(
    (a: DocumentData, b: DocumentData) =>
      a.data().createdAt.seconds - b.data().createdAt.seconds,
  );

  const feedbacks = await Promise.all(
    sortFeedbacks.map(async doc => {
      const userId = doc.data().userId;

      // userId가 없으면 null을 반환하고 userDoc는 null이 됨
      const userDoc = userId ? await getDoc(userId) : null;

      // userDoc가 실제로 존재하는지 확인 후 데이터를 가져옴
      const user = userDoc && userDoc.exists() ? userDoc.data() : null;

      return {
        id: doc.id,
        user: user,
        ...doc.data(),
      };
    }),
  );

  return feedbacks;
};

const useGetFeedbacks = (submittedAssignmentId: string) => {
  const { data, isLoading, error } = useQuery(
    ["getFeedbacks", submittedAssignmentId],
    () => getFeedbacks(submittedAssignmentId),
    {
      refetchOnWindowFocus: false,
    },
  );

  return { data, isLoading, error };
};

export { useGetFeedbacks };
