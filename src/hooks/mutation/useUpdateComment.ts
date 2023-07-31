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
    onMutate: async updatedComment => {
      await queryClient.cancelQueries(["comments"]);
      const previousComments = queryClient.getQueryData<DocumentData[]>([
        "comments",
      ]);

      queryClient.setQueryData(
        ["comments"],
        (old: DocumentData[] | undefined) => {
          return old?.map(comment =>
            comment.id === updatedComment.id
              ? { ...comment, ...updatedComment }
              : comment,
          );
        },
      );

      return { previousComments };
    },
    onSettled: () => {
      queryClient.invalidateQueries(["comments"]);
    },
    onError: (_err, _newComment, context) => {
      if (context?.previousComments) {
        queryClient.setQueryData(["comments"], context.previousComments);
      }
    },
  });
};
