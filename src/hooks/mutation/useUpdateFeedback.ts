// useUpdateFeedback
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateDoc, doc, Timestamp } from "firebase/firestore";
import { db } from "@utils/firebase";
import { Feedback } from "@/types/firebase.types";

interface IUpdateFeedbackValue {
  content: string;
  updatedAt: Date;
}

const updateFeedback = async (
  submittedAssignmentId: string,
  feedbackId: string,
  updateFeedbackValue: IUpdateFeedbackValue,
) => {
  try {
    await updateDoc(
      doc(
        db,
        `submittedAssignments/${submittedAssignmentId}/feedbacks`,
        feedbackId,
      ),
      {
        ...updateFeedbackValue,
        updatedAt: Timestamp.fromDate(updateFeedbackValue.updatedAt),
      },
    );
  } catch (err) {
    throw err;
  }
};

const useUpdateFeedback = (
  submittedAssignmentId: string,
  feedbackId: string,
) => {
  const queryClient = useQueryClient();
  const { mutate, isLoading, error } = useMutation(
    (updateFeedbackValue: IUpdateFeedbackValue) =>
      updateFeedback(submittedAssignmentId, feedbackId, updateFeedbackValue),
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
