// useUpdateSubmittedAssignment
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "@utils/firebase";

interface IUpdateValue {
  isRead: boolean;
}

const updateSubmittedAssignment = async (
  submittedAssignmentId: string,
  updateValue: IUpdateValue,
) => {
  try {
    await updateDoc(
      doc(db, `submittedAssignments`, submittedAssignmentId),
      updateValue as any,
    );
  } catch (err) {
    throw err;
  }
};

const useUpdateSubmittedAssignment = (
  assignmentId: string,
  submittedAssignmentId: string,
) => {
  const queryClient = useQueryClient();
  const { mutate, isLoading, error } = useMutation(
    (updateValue: IUpdateValue) =>
      updateSubmittedAssignment(submittedAssignmentId, updateValue),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["getSubmittedAssignment", assignmentId]);
      },
      onError: err => {
        console.log(err);
      },
    },
  );

  return { mutate, isLoading, error };
};

export { useUpdateSubmittedAssignment };
