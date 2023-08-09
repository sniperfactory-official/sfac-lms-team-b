import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "@utils/firebase";

// Firestore 데이터 추가
const updateReadStudents = async (
  assignmentId: string,
  readStudents: string[],
) => {
  try {
    await updateDoc(doc(db, "assignments", assignmentId), { readStudents });
  } catch (err) {
    throw err;
  }
};

const useUpdateReadStudents = (assignmentId: string) => {
  const queryClient = useQueryClient();
  const { mutate, isLoading, error } = useMutation(
    (readStudents: string[]) => updateReadStudents(assignmentId, readStudents),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["getAssignment", assignmentId || ""]);
      },
      onError: err => {
        console.log(err);
      },
    },
  );
  return { mutate, isLoading, error };
};

export { useUpdateReadStudents };
