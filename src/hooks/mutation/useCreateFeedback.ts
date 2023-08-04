import { useMutation, useQueryClient } from "@tanstack/react-query";
import { collection, addDoc, Timestamp, doc } from "firebase/firestore";
import { db } from "@utils/firebase";

interface IFeedbackValue {
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

const createFeedback = async (
  submittedAssignmentId: string,
  feedbackValue: IFeedbackValue,
  uid: string,
) => {
  try {
    const userRef = doc(db, "users", uid);

    await addDoc(
      collection(
        db,
        "submittedAssignments",
        submittedAssignmentId,
        "feedbacks",
      ),
      {
        ...feedbackValue,
        userId: userRef,
        createdAt: Timestamp.fromDate(feedbackValue.createdAt),
        updatedAt: Timestamp.fromDate(feedbackValue.updatedAt),
      },
    );
  } catch (err) {
    throw err;
  }
};

const useCreateFeedback = (submittedAssignmentId: string, uid: string) => {
  const queryClient = useQueryClient();
  const { mutate, isLoading, error } = useMutation(
    (feedbackValue: IFeedbackValue) =>
      createFeedback(submittedAssignmentId, feedbackValue, uid),
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

export { useCreateFeedback };
