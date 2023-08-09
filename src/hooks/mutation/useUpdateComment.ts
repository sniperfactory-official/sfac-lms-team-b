import { useMutation, useQueryClient } from "@tanstack/react-query";
import { db } from "@/utils/firebase";
import {
  doc,
  serverTimestamp,
  updateDoc,
  DocumentData,
} from "firebase/firestore";

const updateCommentInDB = async (data: { id: string; newContent: string }) => {
  const { id, newContent } = data;

  const commentRef = doc(db, "lectureComments", id);

  const updatedComment = {
    content: newContent,
    updatedAt: serverTimestamp(),
  };

  await updateDoc(commentRef, updatedComment);
};

export const useUpdateComment = () => {
  const queryClient = useQueryClient();
  return useMutation(updateCommentInDB, {
    onSuccess: () => {
      queryClient.invalidateQueries(["comments"]);
    },
  });
};
