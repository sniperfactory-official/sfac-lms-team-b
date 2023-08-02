import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateDoc, doc, DocumentReference } from "firebase/firestore";
import { db } from "@utils/firebase";
import { Assignment } from "@/types/firebase.types";

// Firestore 데이터 추가
const updateAssignment = async (assignmentValue: Assignment) => {
  try {
    const updateAssignment = await updateDoc(
      doc(db, "assignments", "assignmentValue.id"),
      { ...assignmentValue },
    );
    return updateAssignment;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const useUpdateAssignment = () => {
  const queryClient = useQueryClient();
  const { mutate, isLoading, error } = useMutation(updateAssignment, {
    onSuccess: () => {
      queryClient.invalidateQueries(["getAssignment", ""]);
    },
    onError: err => {
      console.log(err);
    },
  });
  return { mutate, isLoading, error };
};

export { useUpdateAssignment };
