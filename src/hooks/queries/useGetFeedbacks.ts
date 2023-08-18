import { useQuery } from "@tanstack/react-query";
import {
  collection,
  getDoc,
  getDocs,
  DocumentData,
  DocumentReference,
  Timestamp,
} from "firebase/firestore";
import { db } from "@utils/firebase";
import { getTime } from "@/utils/getTime";

interface IUser {
  id: string;
  role: "수강생" | "관리자";
  email: string;
  username: string;
  profileImage: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface IFeedback {
  id: string;
  user: IUser;
  userId: DocumentReference;
  content: string;
  createdAt: string;
  updatedAt: string;
}

const getFeedbacks = async (
  submittedAssignmentId: string,
): Promise<IFeedback[] | null> => {
  const feedbacksDocs = await getDocs(
    collection(db, "submittedAssignments", submittedAssignmentId, "feedbacks"),
  );

  if (feedbacksDocs.empty) return null;

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

      const createdDate = getTime(doc.data().createdAt.toDate());
      const updatedDate = getTime(doc.data().updatedAt.toDate());

      return {
        id: doc.id,
        user: user,
        ...doc.data(),
        createdAt: createdDate,
        updatedAt: updatedDate,
      };
    }),
  );

  return feedbacks as IFeedback[];
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
