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

    if (typeof attachmentValue[0] === "string") {
      await addDoc(collection(db, "attachments"), {
        attachmentValue: [],
        links: [...attachmentValue],
        submittedAssignmentId: addSubmittedAssignmentData,
        userId: userRef,
      });
    } else {
      await addDoc(collection(db, "attachments"), {
        attachmentValue: [...attachmentValue],
        links: [],
        submittedAssignmentId: addSubmittedAssignmentData,
        userId: userRef,
      });
    }

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
        queryClient.invalidateQueries([
          "getSubmittedAssignment",
          assignmentId,
          userId,
        ]);
      },
      onError: err => {
        console.log(err);
      },
    },
  );

  return { mutate, isLoading, error };
};

export { useSubmitAssignment };
