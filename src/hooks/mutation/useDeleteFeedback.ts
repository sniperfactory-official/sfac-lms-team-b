import { useMutation, useQueryClient } from "@tanstack/react-query";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "@utils/firebase";

const deleteFeedback = async (
  submittedAssignmentId: string,
  feedbackId: string,
) => {
  try {
    await deleteDoc(
      doc(
        db,
        `submittedAssignments/${submittedAssignmentId}/feedbacks`,
        feedbackId,
      ),
    );
  } catch (err) {
    throw err;
  }
};

const useDeleteFeedback = (
  submittedAssignmentId: string,
  feedbackId: string,
) => {
  const queryClient = useQueryClient();
  const { mutate, isLoading, error } = useMutation(
    () => deleteFeedback(submittedAssignmentId, feedbackId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["getFeedbacks", submittedAssignmentId]);
      },
      onError: err => {
        console.log(err);
      },
    },
  );

  return { mutate, isLoading, error };
};

export { useDeleteFeedback };
