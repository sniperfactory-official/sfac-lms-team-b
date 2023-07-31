import { useMutation, useQueryClient } from "@tanstack/react-query";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "@utils/firebase";

const deleteSubmittedAssignment = async (submittedAssimentId: string) => {
  try {
    // 관리자의 feedback 없을때 해당과제만 삭제
    const deleteSubmittedAssignmentDoc = await deleteDoc(
      doc(db, "submittedAssignments", "제출된 과제의 ID"),
    );
    return deleteSubmittedAssignmentDoc;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const useDeleteSubmittedAssignment = (assignmentId: string) => {
  const queryClient = useQueryClient();
  const { mutate, isLoading, error } = useMutation(deleteSubmittedAssignment, {
    onSuccess: () => {
      queryClient.invalidateQueries(["getSubmittedAssignment", assignmentId]);
    },
    onError: err => {
      console.log(err);
    },
  });
  return { mutate, isLoading, error };
};

export { useDeleteSubmittedAssignment };

// 시간순으로 정렬하기.
