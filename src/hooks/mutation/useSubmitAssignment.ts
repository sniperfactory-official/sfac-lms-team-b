import { useMutation, useQueryClient } from "@tanstack/react-query";
import { collection, doc, addDoc, DocumentReference } from "firebase/firestore";

import { db } from "@utils/firebase";
import { SubmittedAssignment } from "@/types/firebase.types";

interface SubmitAssignmentParams {
  assignmentId: string;
  submitAssignmentValue: SubmittedAssignment;
  attachmentValue: Attachment;
}

const submitAssignment = async ({
  assignmentId,
  submitAssignmentValue,
  attachmentValue,
}: SubmitAssignmentParams): Promise<DocumentReference> => {
  try {
    const assignmentRef = doc(db, "assignments", assignmentId);

    const addSubmittedAssignmentData = await addDoc(
      collection(db, "submittedAssignments"),
      { submitAssignmentValue },
    );

    const attachmentsData = await addDoc(collection(db, "attachments"), {
      ...attachmentValue,
      addSubmittedAssignmentData,
      userId,
    });

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

const useSubmitAssignment = (assignmentId: string) => {
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

export { useSubmitAssignment };
