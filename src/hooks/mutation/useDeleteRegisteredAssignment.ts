import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  doc,
  deleteDoc,
  query,
  collection,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "@utils/firebase";

const deleteRegisteredAssignment = async (assignmentId: string) => {
  try {
    const assignmentRef = doc(db, "assignments", assignmentId);

    await deleteDoc(assignmentRef);

    const submittedAssignmentsQuery = query(
      collection(db, "submittedAssignments"),
      where("assignmentId", "==", assignmentRef),
    );

    const submittedAssignmentsDocs = await getDocs(submittedAssignmentsQuery);

    await Promise.all(
      submittedAssignmentsDocs.docs.map(async document => {
        await deleteDoc(doc(db, "submittedAssignments", document.id));

        const attachmentsQuery = query(
          collection(db, "attachments"),
          where("submittedAssignmentId", "==", document.ref),
        );

        const attachmentDocs = await getDocs(attachmentsQuery);

        await deleteDoc(doc(db, "attachments", attachmentDocs.docs[0].id));
        console.log("성공~~");
      }),
    );
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const useDeleteRegisteredAssignment = (assignmentId: string) => {
  const queryClient = useQueryClient();
  const { mutate, isLoading, error } = useMutation(deleteRegisteredAssignment, {
    onSuccess: () => {
      queryClient.invalidateQueries(["getAssignment", assignmentId]);
    },
    onError: err => {
      console.log(err);
    },
  });
  return { mutate, isLoading, error };
};

export { useDeleteRegisteredAssignment };
