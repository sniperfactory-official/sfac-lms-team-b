import { useQuery } from "@tanstack/react-query";
import {
  collection,
  getDoc,
  getDocs,
  doc,
  query,
  where,
} from "firebase/firestore";

import { db } from "@utils/firebase";
import { SubmittedAssignment } from "@/types/firebase.types";

const getSubmittedAssignments = async (
  assignmentId: string,
): Promise<SubmittedAssignment[] | SubmittedAssignment> => {
  const assignmentRef = doc(db, "assignments", assignmentId);
  const assignmentSnapshot = await getDoc(assignmentRef);

  // 추후 user정보를 전역상태로 관리 할 때 코드 변경 예정
  const userRef = doc(db, "users", "userId");
  const userSnapshot = await getDoc(userRef);

  if ("수강생") {
    const submittedAssignmentsQuery = query(
      collection(db, "submittedAssignments"),
      where("assignmentId", "==", assignmentSnapshot.ref),
      where("userId", "==", userSnapshot.ref),
    );

    const submittedAssignmentsDocs = await getDocs(submittedAssignmentsQuery);
    const submittedAssignments = submittedAssignmentsDocs?.docs.map(doc => {
      return { id: doc.id, ...doc.data() } as SubmittedAssignment;
    });

    return submittedAssignments;
  }

  const submittedAssignmentsQuery = query(
    collection(db, "submittedAssignments"),
    where("assignmentId", "==", assignmentSnapshot.ref),
  );
  const submittedAssignmentsDocs = await getDocs(submittedAssignmentsQuery);
  const submittedAssignments = submittedAssignmentsDocs?.docs.map(doc => {
    return { id: doc.id, ...doc.data() } as SubmittedAssignment;
  });

  return submittedAssignments;
};

const useGetSubmittedAssignments = (assignmentId: string) => {
  const { data, isLoading, error } = useQuery(
    ["getSubmittedAssignment", assignmentId],
    () => getSubmittedAssignments(assignmentId),
    {
      refetchOnWindowFocus: false,
    },
  );

  return { data, isLoading, error };
};

export { useGetSubmittedAssignments };
