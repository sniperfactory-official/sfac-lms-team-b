import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateDoc, doc, serverTimestamp, Timestamp } from "firebase/firestore";
import { db } from "@utils/firebase";
import { Assignment } from "@/types/firebase.types";

// Firestore 데이터 추가
const updateAssignment = async (
  assignmentValue: Assignment,
  assignmentId: string,
) => {
  try {
    const updateAssignment = await updateDoc(
      doc(db, "assignments", assignmentId),
      {
        ...assignmentValue,
        updatedAt: serverTimestamp(),
      },
    );

    return updateAssignment;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const useUpdateAssignment = (assignmentId: string) => {
  const queryClient = useQueryClient();
  const { mutate, isLoading, error } = useMutation(
    (assignmentValue: Assignment) =>
      updateAssignment(assignmentValue, assignmentId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["getAssignment", assignmentId || ""]);
      },
      onError: err => {
        console.log(err);
      },
    },
  );
  return { mutate, isLoading, error };
};

export { useUpdateAssignment };
