import { useMutation, useQueryClient } from "@tanstack/react-query";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "@utils/firebase";

const deleteRegisteredAssignment = async (assignmentId: string) => {
  try {
    const deleteRegisteredAssignmentDoc = await deleteDoc(
      doc(db, "assignments", assignmentId),
    );
    return deleteRegisteredAssignmentDoc;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const useDeleteRegisteredAssignment = (assignmentId: string) => {
  const queryClient = useQueryClient();
  const { mutate, isLoading, error } = useMutation(deleteRegisteredAssignment, {
    onSuccess: () => {
      queryClient.invalidateQueries(["getAssignment", assignmentId]);
    },
    onError: err => {
      console.log(err);
    },
  });
  return { mutate, isLoading, error };
};

export { useDeleteRegisteredAssignment };
