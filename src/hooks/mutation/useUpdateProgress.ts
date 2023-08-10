import { useMutation, useQueryClient } from "@tanstack/react-query";
import { db } from "@/utils/firebase";
import { doc, updateDoc, DocumentData } from "firebase/firestore";

const updateProgressInDB = async (data: {
  id: string;
  start: string;
  end: string;
}) => {
  const { id, start, end } = data;

  const progressRef = doc(db, "progress", id);

  const updatedProgress = {
    playTimes: [
      {
        start: start,
        end: end,
      },
    ],
  };

  await updateDoc(progressRef, updatedProgress);

  return { id, start, end };
};

export const useUpdateProgress = () => {
  const queryClient = useQueryClient();
  return useMutation(updateProgressInDB, {
    onSuccess: data => {
      queryClient.setQueryData(
        ["progress", data.id],
        (oldProgress: DocumentData | undefined) => {
          if (oldProgress) {
            return {
              ...oldProgress,
              playTimes: [
                {
                  start: data.start,
                  end: data.end,
                },
              ],
            };
          }
          return oldProgress;
        },
      );
      queryClient.invalidateQueries(["progress"]);
    },
  });
};
