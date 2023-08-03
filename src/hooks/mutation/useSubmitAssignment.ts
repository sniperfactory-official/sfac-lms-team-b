import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  collection,
  doc,
  addDoc,
  DocumentReference,
  Timestamp,
} from "firebase/firestore";
import { db } from "@utils/firebase";
import { Attachment, User } from "@/types/firebase.types";
import { getAuth } from "firebase/auth";

const submitAssignment = async (
  assignmentId: string,
  attachmentValue: Attachment,
): Promise<DocumentReference> => {
  const auth = getAuth();
  const user: any = auth.currentUser; // FIXME: any 말고 ts type 수정 필요함
  const userId = user.uid;
  const userRef = doc(db, "user", userId);

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
      ...attachmentValue,
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

const useSubmitAssignment = (
  assignmentId: string,
  attachmentValue: Attachment,
) => {
  const queryClient = useQueryClient();
  const { mutate, isLoading, error } = useMutation(
    () => submitAssignment(assignmentId, attachmentValue),
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
