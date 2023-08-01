import { useMutation, useQueryClient } from "@tanstack/react-query";
import { db } from "@/utils/firebase";
import {
  collection,
  doc,
  serverTimestamp,
  runTransaction,
  updateDoc,
  DocumentData,
} from "firebase/firestore";

const addCommentToDB = async (data: {
  content: string;
  lectureId: string;
  parentId: string;
  userId: string;
}) => {
  const { content, lectureId, parentId, userId } = data;
  
  const userRef = doc(db, "users", userId);
  const lectureRef = doc(db, "lectures", lectureId);
  const parentCommentRef = parentId ? doc(db, "lectureComments", parentId) : null;
  
  const commentRef = doc(collection(db, "lectureComments"));

  const commentDoc = {
    content,
    createdAt: serverTimestamp(),
    lectureId: lectureRef,
    parentId,
    replyCount: 0,
    updatedAt: serverTimestamp(),
    userId: userRef,
  };

  await runTransaction(db, async transaction => {
    if (parentId && parentCommentRef) {
      const parentCommentSnapshot = await transaction.get(parentCommentRef);
      if (!parentCommentSnapshot.exists()) {
        throw Error("Parent comment does not exist!");
      }
      const parentComment = parentCommentSnapshot.data();
      transaction.update(parentCommentRef, {
        replyCount: parentComment.replyCount + 1,
      });
    }

    transaction.set(commentRef, commentDoc);
    return { id: commentRef.id, ...commentDoc };
  });
};

export const useAddComment = () => {
  const queryClient = useQueryClient();

  return useMutation(addCommentToDB, {
    onMutate: async newComment => {
      await queryClient.cancelQueries(["comments"]);
      const previousComments = queryClient.getQueryData<DocumentData[]>([
        "comments",
      ]);
      queryClient.setQueryData(
        ["comments"],
        (old: DocumentData[] | undefined) => {
          return [...(old ?? []), newComment];
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
