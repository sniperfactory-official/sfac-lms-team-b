import { useQuery } from "@tanstack/react-query";
import {
  collection,
  getDoc,
  getDocs,
  doc,
  query,
  where,
  DocumentData,
} from "firebase/firestore";

import { db } from "@utils/firebase";
import { SubmittedAssignment, Attachment } from "@/types/firebase.types";

const getSubmittedAssignments = async (assignmentId: string): Promise<any> => {
  const assignmentRef = doc(db, "assignments", assignmentId);
  const assignmentDoc = await getDoc(assignmentRef);
  const loginUserRef = doc(db, "users", "유저아이디 넣기");
  const loginUserDoc = await getDoc(loginUserRef);

  if (!"수강생일때 조건문 넣기") {
    const submittedAssignmentsQuery = query(
      collection(db, "submittedAssignments"),
      where("assignmentId", "==", assignmentDoc.ref),
      where("userId", "==", loginUserDoc.ref),
    );

    const submittedAssignmentsDocs = await getDocs(submittedAssignmentsQuery);
    const submittedAssignments = submittedAssignmentsDocs?.docs.map(doc => {
      return {
        id: doc.id,
        user: loginUserDoc.data(),
        ...doc.data(),
      } as SubmittedAssignment;
    });

    return submittedAssignments;
  }

  // 관리자일때
  const submittedAssignmentsQuery = query(
    collection(db, "submittedAssignments"),
    where("assignmentId", "==", assignmentDoc.ref),
  );
  const submittedAssignmentsDocs = await getDocs(submittedAssignmentsQuery);

  // createdAt 시간순으로 sort
  const sortSubmittedAssignments = submittedAssignmentsDocs?.docs.sort(
    (a: DocumentData, b: DocumentData) =>
      a.date().createdAt.seconds - b.date().createdAt.seconds,
  );
  const submittedAssignments = await Promise.all(
    sortSubmittedAssignments.map(async document => {
      const attachmentQuery = query(
        collection(db, "attachments"),
        where("submittedAssignmentId", "==", document.ref),
      );
      const attachmentDocs = await getDocs(attachmentQuery);
      const attachment = attachmentDocs.docs[0].data();

      const userRef = doc(db, "users", document.data().userId.id);
      const userDoc = await getDoc(userRef);

      return {
        id: document.id,
        user: userDoc.data(),
        attachment: attachment,
        ...document.data(),
      };
    }),
  );

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
