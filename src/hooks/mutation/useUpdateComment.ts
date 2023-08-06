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

  if (newContent.length === 0 || newContent.length > 500) {
    throw new Error("Content is not valid.");
  }

  const commentRef = doc(db, "lectureComments", id);

  const updatedComment = {
    content: newContent,
    updatedAt: serverTimestamp(),
  };

  await updateDoc(commentRef, updatedComment);

  return { id, newContent };
};

export const useUpdateComment = () => {
  const queryClient = useQueryClient();
  return useMutation(updateCommentInDB, {
    onSuccess: data => {
      queryClient.setQueryData(
        ["comments", data.id],
        (oldComment: DocumentData | undefined) => {
          if (oldComment) {
            return {
              ...oldComment,
              content: data.newContent,
              updatedAt: new Date(),
            };
          }
          return oldComment;
        },
      );
    },
  });
};
