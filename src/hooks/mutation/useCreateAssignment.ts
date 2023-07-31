import { useMutation, useQueryClient } from "@tanstack/react-query";
import { collection, addDoc, DocumentReference } from "firebase/firestore";
import { db } from "@utils/firebase";
import { Assignment } from "@/types/firebase.types";

// Firestore 데이터 추가
const createAssignment = async (
  assignmentValue: Assignment,
): Promise<DocumentReference> => {
  try {
    const addAssignment = await addDoc(collection(db, "assignments"), {
      ...assignmentValue,
    });
    return addAssignment;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const useCreateAssignment = () => {
  const queryClient = useQueryClient();
  const { mutate, isLoading, error } = useMutation(createAssignment, {
    onSuccess: () => {
      queryClient.invalidateQueries(["getAssignment", ""]);
    },
    onError: err => {
      console.log(err);
    },
  });
  return { mutate, isLoading, error };
};

export { useCreateAssignment };
