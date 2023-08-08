import { useMutation, useQueryClient } from "@tanstack/react-query";
import { doc, deleteDoc, writeBatch } from "firebase/firestore";
import { db } from "@utils/firebase";

const deleteRegisteredAssignment = async (
  deletingAssignmentIndex: string[],
) => {
  try {
    if (deletingAssignmentIndex.length === 0) {
      throw Error;
    }
    // Get a new write batch
    const batch = writeBatch(db);

    deletingAssignmentIndex.forEach((targetIndex: string) => {
      const deleteRef = doc(db, "assignments", targetIndex);
      batch.delete(deleteRef);
    });

    // Commit the batch
    await batch.commit();
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const useDeleteRegisteredAssignmentByAssignmentId = () => {
  const queryClient = useQueryClient();
  const { mutate, isLoading, error } = useMutation(
    (deletingAssignmentIndex: string[]) =>
      deleteRegisteredAssignment(deletingAssignmentIndex),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["getAssignment", ""]);
      },
      onError: err => {
        console.log(err);
      },
    },
  );
  return { mutate, isLoading, error };
};

export { useDeleteRegisteredAssignmentByAssignmentId };
