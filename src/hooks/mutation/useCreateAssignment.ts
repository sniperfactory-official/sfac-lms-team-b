import { useQuery } from "@tanstack/react-query";
import { collection, addDoc, DocumentReference } from "firebase/firestore";
import { db } from "@utils/firebase";
import { Assignment } from "@/types/firebase.types";

// Firestore 데이터 추가
const createAssignment = async (
  assignmentValue: Assignment,
): Promise<DocumentReference> => {
  const addAssignmentData = await addDoc(
    collection(db, "assignments"),
    assignmentValue,
  );
  return addAssignmentData;
};

const useCreateAssignment = (assignmentValue: Assignment) => {
  const { data, isLoading, error } = useQuery(
    ["createAssignment"],
    () => createAssignment(assignmentValue),
    { cacheTime: 0, refetchOnWindowFocus: false }, // 과제 생성기능 이므로 cache기능 off
  );
  return { data, isLoading, error };
};

export { useCreateAssignment };
