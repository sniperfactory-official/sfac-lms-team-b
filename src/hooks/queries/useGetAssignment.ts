import { useQuery } from "@tanstack/react-query";
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
const getAssignments = async (assignmentId?: string): Promise<any> => {
  if (assignmentId) {
    const assignmentRef = doc(db, "assignments", assignmentId);
    const assignment = (await getDoc(assignmentRef)).data() as Assignment;

    return assignment;
  }
  const assignmentsDocs = await getDocs(collection(db, "assignments"));
  const assignments = assignmentsDocs?.docs.map((doc: DocumentData) => {
    return { id: doc.id, ...doc.data() };
  });

  return assignments;
};

// getAssignments를 React Query로 상태관리.
const useGetAssignment = (assignmentId?: string) => {
  const { data, isLoading, error } = useQuery<any>(
    ["getAssignment", assignmentId || ""],
    () => getAssignments(assignmentId),
    {
      refetchOnWindowFocus: false,
    },
  );

  // if (data === undefined) {
  //   refetch();
  // }

  return { data, isLoading, error };
};

export { useGetAssignment };
