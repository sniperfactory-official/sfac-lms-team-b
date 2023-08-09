import { useMutation, useQueryClient } from "@tanstack/react-query";
import { db } from "@/utils/firebase";
import { doc, updateDoc, DocumentData } from "firebase/firestore";

const updateCompletionInDB = async (id: string) => {
  const progressRef = doc(db, "progress", id);

  await updateDoc(progressRef, { isCompleted: true });

  return { id };
};

export const useUpdateCompletion = () => {
  const queryClient = useQueryClient();
  return useMutation(updateCompletionInDB, {
    onSuccess: data => {
      queryClient.setQueryData(
        ["progress", data.id],
        (oldProgress: DocumentData | undefined) => {
          if (oldProgress) {
            return {
              ...oldProgress,
              isCompleted: true,
            };
          }
          return oldProgress;
        },
      );
      queryClient.invalidateQueries(["progress"]);
    },
  });
};
