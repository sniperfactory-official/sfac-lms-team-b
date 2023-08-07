import { useMutation, useQueryClient } from "@tanstack/react-query";
import { doc, deleteDoc, query, collection, where } from "firebase/firestore";
import { db } from "@utils/firebase";

const deleteRegisteredAssignment = async (assignmentId: string) => {
  try {
    // const deleteRegisteredAssignmentDoc = await deleteDoc(
    //   doc(db, "assignments", assignmentId),
    // );

    const assignmentRef = doc(db, "assignments", assignmentId);

    const submittedAssignmentsQuery = query(
      collection(db, "submittedAssignments"),
      where("assignmentId", "==", assignmentRef),
    );

    // const attachmentsQuery = query(collection(db, "attachments"),where())

    // query(
    //   collection(db, "attachments"),
    //   where("submittedAssignmentId", "==", submittedAssignmentRef),
    //   where("userId", "==", userRef),
    // );

    // return deleteRegisteredAssignmentDoc;
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
