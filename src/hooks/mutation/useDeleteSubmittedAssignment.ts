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

const deleteSubmittedAssignment = async (
  submittedAssignmentId: string,
  userId: string,
) => {
  try {
    const submittedAssignmentRef = doc(
      db,
      "submittedAssignments",
      submittedAssignmentId,
    );
    const userRef = doc(db, "users", userId);

    const attachmentsQuery = query(
      collection(db, "attachments"),
      where("submittedAssignmentId", "==", submittedAssignmentRef),
      where("userId", "==", userRef),
    );

    const submittedAssignmentsDocs = await getDocs(attachmentsQuery);

    await deleteDoc(
      doc(db, "attachments", submittedAssignmentsDocs.docs[0].id),
    );

    // 관리자의 feedback 없을때 해당과제만 삭제
    await deleteDoc(doc(db, "submittedAssignments", submittedAssignmentId));
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const useDeleteSubmittedAssignment = (assignmentId: string, userId: string) => {
  const queryClient = useQueryClient();
  const { mutate, isLoading, error } = useMutation(
    (submittedAssimentId: string) =>
      deleteSubmittedAssignment(submittedAssimentId, userId),
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

export { useDeleteSubmittedAssignment };

// 시간순으로 정렬하기.
