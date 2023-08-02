import { useMutation, useQueryClient } from "@tanstack/react-query";
import { collection, addDoc, DocumentReference } from "firebase/firestore";
import { db } from "@utils/firebase";
import { Feedback } from "@/types/firebase.types";

const createFeedbacks = async (
  submittedAssignmentId: string,
  feedbackValue?: Feedback,
) => {
  try {
    await addDoc(
      collection(
        db,
        "submittedAssignments",
        submittedAssignmentId,
        "feedbacks",
      ),
      { content: "ㅎㅇ" },
    );
  } catch (err) {
    throw err;
  }
};

const useCreateFeedback = (submittedAssignmentId: string) => {
  const queryClient = useQueryClient();
  const { mutate, isLoading, error } = useMutation(
    () => createFeedbacks(submittedAssignmentId),
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

export default useCreateFeedback;
