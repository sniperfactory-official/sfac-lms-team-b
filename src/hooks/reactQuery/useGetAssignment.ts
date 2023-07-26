import {
  QueryFunctionContext,
  QueryKey,
  useQuery,
} from "@tanstack/react-query";
import {
  DocumentData,
  collection,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "@utils/firebase";
import { Assignment } from "@/types/firebase.types";

// Firestore 데이터 return
const getAssignments = async (assignmentId?: string): Promise<Assignment[]> => {
  if (assignmentId) {
    // const rawData = await getDocs(collection(db, "assignments"));
    // const assignmentData: any = rawData;

    const assignmentRef = doc(collection(db, "assignments"), assignmentId);
    const assignmentSnapshot: any = await getDoc(assignmentRef);

    return assignmentSnapshot;
  }
  const rawData = await getDocs(collection(db, "assignments"));
  const assignmentData = rawData?.docs.map((doc: DocumentData) => doc.data());

  return assignmentData;
};

// getAssignments를 React Query로 상태관리.
const useGetAssignment = (assignmentId?: string) => {
  const { data, isLoading, error } = useQuery<Assignment[]>(
    ["getAssignment"],
    () => getAssignments(assignmentId),
    {
      refetchOnWindowFocus: false,
    },
  );
  return { data, isLoading, error };
};

export { useGetAssignment };
