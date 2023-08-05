// useUpdateFeedback
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "@utils/firebase";
import { Feedback } from "@/types/firebase.types";

const updateFeedback = async (
  submittedAssignmentId: string,
  feedbackId: Feedback,
) => {
  try {
    await updateDoc(
      doc(
        db,
        `submittedAssignments/${submittedAssignmentId}/feedbacks`,
        "feedbackId",
      ),
      { content: "ㅂㅇ" },
    );
  } catch (err) {
    throw err;
  }
};

const useUpdateFeedback = (
  submittedAssignmentId: string,
  feedbackId: Feedback,
) => {
  const queryClient = useQueryClient();
  const { mutate, isLoading, error } = useMutation(
    () => updateFeedback(submittedAssignmentId, feedbackId),
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

export { useUpdateFeedback };
