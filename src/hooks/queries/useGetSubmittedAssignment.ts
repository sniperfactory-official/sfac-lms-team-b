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
import { Attachment, SubmittedAssignment, User } from "@/types/firebase.types";

export interface ISubmittedAssignment extends SubmittedAssignment {
  attachment: Attachment;
  user: User;
}

const getSubmittedAssignments = async (
  assignmentId: string,
  uid?: string,
): Promise<ISubmittedAssignment | ISubmittedAssignment[] | null> => {
  const assignmentRef = doc(db, "assignments", assignmentId);
  const assignmentDoc = await getDoc(assignmentRef);

  // uid parameter로 넘어왔을때
  if (uid) {
    const loginUserRef = doc(db, "users", uid);
    const loginUserDoc = await getDoc(loginUserRef);
    const loginUserData = loginUserDoc.data();

    if (loginUserData?.role === "수강생") {
      const submittedAssignmentsQuery = query(
        collection(db, "submittedAssignments"),
        where("assignmentId", "==", assignmentRef),
        where("userId", "==", loginUserRef),
      );
      const submittedAssignmentsDocs = await getDocs(submittedAssignmentsQuery);

      if (submittedAssignmentsDocs.empty) return null;

      const attachmentQuery = query(
        collection(db, "attachments"),
        where(
          "submittedAssignmentId",
          "==",
          submittedAssignmentsDocs.docs[0].ref,
        ),
      );
      const attachmentDocs = await getDocs(attachmentQuery);
      const attachment = attachmentDocs.docs[0].data();

      const submittedAssignments = submittedAssignmentsDocs?.docs.map(doc => {
        return {
          id: doc.id,
          user: loginUserDoc.data(),
          attachment: attachment,
          ...doc.data(),
        };
      });


      return { ...submittedAssignments[0] } as ISubmittedAssignment;
    }
  } else {
    // 관리자일때
    const submittedAssignmentsQuery = query(
      collection(db, "submittedAssignments"),
      where("assignmentId", "==", assignmentDoc.ref),
    );
    const submittedAssignmentsDocs = await getDocs(submittedAssignmentsQuery);

    if (submittedAssignmentsDocs.empty) return null;

    const rawSubmittedAssignments = await Promise.all(
      submittedAssignmentsDocs?.docs.map(async document => {
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

    const submittedAssignments = rawSubmittedAssignments.sort(
      (a: DocumentData, b: DocumentData) =>
        a.createdAt.seconds - b.createdAt.seconds,
    );

    return submittedAssignments as ISubmittedAssignment[];
  }
  return null;
};

const useGetSubmittedAssignments = (assignmentId: string, uid?: string) => {
  const { data, isLoading, error } = useQuery(
    ["getSubmittedAssignment", assignmentId, uid || ""],
    () => getSubmittedAssignments(assignmentId, uid),
    {
      refetchOnWindowFocus: false,
    },
  );

  return { data, isLoading, error };
};

export { useGetSubmittedAssignments };
