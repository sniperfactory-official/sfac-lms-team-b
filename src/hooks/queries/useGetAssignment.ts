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
const getAssignments = async (
  assignmentId?: string,
): Promise<Assignment[] | Assignment> => {
  if (assignmentId) {
    const assignmentRef = doc(db, "assignments", assignmentId);
    const assignment = (await getDoc(assignmentRef)).data() as Assignment;

    return assignment;
  }
  const assignmentsDocs = await getDocs(collection(db, "assignments"));

  // order number로 sort
  const sortAssignments = assignmentsDocs?.docs.sort(
    (a: DocumentData, b: DocumentData) => a.data().order - b.data().order,
  );

  const assignments = sortAssignments.map((doc: DocumentData) => {
    return { id: doc.id, ...doc.data() };
  });

  return assignments;
};

// getAssignments를 React Query로 상태관리.
const useGetAssignment = (assignmentId?: string) => {
  const { data, isLoading, error } = useQuery<Assignment[] | Assignment>(
    ["getAssignment", assignmentId || ""],
    () => getAssignments(assignmentId),
    {
      refetchOnWindowFocus: false,
    },
  );

  return { data, isLoading, error };
};

export { useGetAssignment };
