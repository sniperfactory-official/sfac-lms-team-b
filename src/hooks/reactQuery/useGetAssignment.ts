import { useQuery } from "@tanstack/react-query";
import { DocumentData, collection, getDocs } from "firebase/firestore";
import { db } from "@utils/firebase";
import { Assignment } from "@/types/firebase.types";

// Firestore 데이터 return
const getAssignments = async (): Promise<Assignment[]> => {
  const rawData = await getDocs(collection(db, "assignments"));
  const assignmentData = rawData?.docs.map((doc: DocumentData) => doc.data());

  return assignmentData;
};

// getAssignments를 React Query로 상태관리.
const useAssignment = () => {
  const { data, isLoading, error } = useQuery<Assignment[]>(
    ["getAssignment"],
    getAssignments,
    {
      refetchOnWindowFocus: false,
    },
  );
  return { data, isLoading, error };
};

export { useAssignment };
