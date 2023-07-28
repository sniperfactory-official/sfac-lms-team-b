import { useQuery } from "@tanstack/react-query";
import { collection, doc, addDoc, DocumentReference } from "firebase/firestore";

import { db } from "@utils/firebase";
import { SubmittedAssignment } from "@/types/firebase.types";

const submitAssignment = async (
  assignmentId: string,
  submitAssignmentValue: SubmittedAssignment,
): Promise<DocumentReference> => {
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
};

const useSubmitAssignmnet = (
  assignmentId: string,
  submitAssignmentValue: SubmittedAssignment,
) => {
  const { data, isLoading, error } = useQuery(
    ["submitAssignmnet", assignmentId],
    () => submitAssignment(assignmentId, submitAssignmentValue),
    {
      cacheTime: 0, // 업로드 기능 이므로 cacheTime 0
      refetchOnWindowFocus: false,
    },
  );

  return { data, isLoading, error };
};

export { useSubmitAssignmnet };
