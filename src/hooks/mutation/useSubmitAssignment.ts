import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  collection,
  doc,
  addDoc,
  DocumentReference,
  Timestamp,
} from "firebase/firestore";
import { db } from "@utils/firebase";

const submitAssignment = async (
  assignmentId: string,
  attachmentValue: string[],
  userId: string,
): Promise<DocumentReference> => {
  const userRef = doc(db, "users", userId);

  try {
    const createdAtTime = new Date();
    const updatedAtTime = new Date();
    const createdAtTimeStamp = Timestamp.fromDate(createdAtTime);
    const updatedAtTimeStamp = Timestamp.fromDate(updatedAtTime);

    const assignmentRef = doc(db, "assignments", assignmentId);
    const addSubmittedAssignmentData = await addDoc(
      collection(db, "submittedAssignments"),
      {
        assignmentId: assignmentRef,
        isRead: false,
        createdAt: createdAtTimeStamp,
        updatedAt: updatedAtTimeStamp,
        userId: userRef,
      },
    );

    await addDoc(collection(db, "attachments"), {
      links: [...attachmentValue],
      submittedAssignmentId: addSubmittedAssignmentData,
      // createdAt: createdAtTimeStamp,
      userId: userRef,
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

const useSubmitAssignment = (assignmentId: string, userId: string) => {
  const queryClient = useQueryClient();
  const { mutate, isLoading, error } = useMutation(
    (attachmentValue: string[]) =>
      submitAssignment(assignmentId, attachmentValue, userId),
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

export { useSubmitAssignment };
