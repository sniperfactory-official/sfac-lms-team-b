import { useMutation, useQueryClient } from "@tanstack/react-query";
import { collection, doc, addDoc, DocumentReference } from "firebase/firestore";

import { db } from "@utils/firebase";
import { SubmittedAssignment } from "@/types/firebase.types";

interface SubmitAssignmentParams {
  assignmentId: string;
  submitAssignmentValue: SubmittedAssignment;
}

const submitAssignment = async ({
  assignmentId,
  submitAssignmentValue,
}: SubmitAssignmentParams): Promise<DocumentReference> => {
  try {
    const assignmentRef = doc(db, "assignments", assignmentId);

    const addSubmittedAssignmentData = await addDoc(
      collection(db, "submittedAssignments"),
      submitAssignmentValue,
    );

    // submittedAssignment안에 서브컬렉션으로 feedbacks가 존재하므로 넣어줌
    await addDoc(
      collection(
        db,
        "submittedAssignments",
        addSubmittedAssignmentData.id,
        "feedbacks",
      ),
      {},
    );

    return addSubmittedAssignmentData;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const useSubmitAssignmnet = (assignmentId: string) => {
  const queryClient = useQueryClient();
  const { mutate, isLoading, error } = useMutation(submitAssignment, {
    onSuccess: () => {
      queryClient.invalidateQueries(["getSubmittedAssignment", assignmentId]);
    },
    onError: err => {
      console.log(err);
    },
  });

  return { mutate, isLoading, error };
};

export { useSubmitAssignmnet };
