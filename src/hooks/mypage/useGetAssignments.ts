import {
  DocumentData,
  collection,
  query,
  where,
  doc,
  getDocs,
  getDoc,
  DocumentReference,
} from "@firebase/firestore";
import { db } from "@/utils/firebase";
import { useQuery } from "@tanstack/react-query";

const getAssignments = async (userId: string) => {
  const userRef = doc(db, "users", userId);

  const attachmentQuery = query(
    collection(db, "attachments"),
    where("userId", "==", userRef),
  );
  const querySnapshot = await getDocs(attachmentQuery);

  let myAssignments: DocumentData[] = [];
  const fetchPromises = [];

  for (const docData of querySnapshot.docs) {
    const assignmentDoc = docData.data();

    if (assignmentDoc.submittedAssignmentId instanceof DocumentReference) {
      fetchPromises.push(
        (async () => {
          const lectureSnapshot = await getDoc(
            assignmentDoc.submittedAssignmentId,
          );
          let submittedData: DocumentData | null = null;
          let AssignmentData = null;

          if (lectureSnapshot.exists()) {
            submittedData = lectureSnapshot.exists() ? (lectureSnapshot.data() as DocumentData) : null;
            if (submittedData && submittedData.assignmentId instanceof DocumentReference) {
              const assignmentSnapshot = await getDoc(
                submittedData.assignmentId,
              );
              if (assignmentSnapshot.exists()) {
                AssignmentData = assignmentSnapshot.data();
              }
            }
          }

          myAssignments.push({
            id: docData.id,
            content: assignmentDoc?.links,
            attachmentFiles: assignmentDoc?.attachmentFiles,
            createdAt: submittedData?.createdAt,
            submittedData,
            AssignmentData,
            ...assignmentDoc,
          });
        })(),
      );
    }
  }

  // Wait for all the fetch operations to complete
  await Promise.all(fetchPromises);

  return myAssignments;
};

export default function useGetAssignments(userId: string) {
  return useQuery(
    ["assignment", userId],
    async () => await getAssignments(userId),
    {
      retry: 1,
    },
  );
}
