import { useQuery } from "@tanstack/react-query";
import { updateDoc, doc, DocumentReference } from "firebase/firestore";
import { db } from "@utils/firebase";
import { Assignment } from "@/types/firebase.types";

// Firestore 데이터 추가
const updateAssignment = async (assignmentValue: Assignment) => {
  const updateAssignment = await updateDoc(
    doc(db, "assignments", "assignmentValue.id"),
    { ...assignmentValue },
  );
  return updateAssignment;
};

const useUpdateAssignment = (assignmentValue: Assignment) => {
  const { data, isLoading, error } = useQuery(
    ["createAssignment", assignmentValue],
    () => updateAssignment(assignmentValue),
    { cacheTime: 0, refetchOnWindowFocus: false }, // 과제 수정기능 이므로 cache기능 off
  );
  return { data, isLoading, error };
};

export { useUpdateAssignment };
