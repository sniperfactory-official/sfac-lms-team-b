import { LectureComment } from "@/types/firebase.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { db } from "@/utils/firebase";
import {
  collection,
  doc,
  serverTimestamp,
  runTransaction,
  Transaction,
} from "firebase/firestore";

interface CommentData {
  content: string;
  lectureId: string;
  parentId?: string;
  userId: string;
}

const increaseParentReplyCount = async (
  transaction: Transaction,
  parentCommentRef: any,
) => {
  const parentCommentSnapshot = await transaction.get(parentCommentRef);
  if (!parentCommentSnapshot.exists) {
    throw Error("Parent comment does not exist!");
  }
  const parentComment = parentCommentSnapshot.data() as LectureComment;
  transaction.update(parentCommentRef, {
    replyCount: parentComment.replyCount + 1,
  });
};

const addCommentToDB = async (data: CommentData) => {
  const { content, lectureId, parentId, userId } = data;

  const userRef = doc(db, "users", userId);
  const lectureRef = doc(db, "lectures", lectureId);
  const parentCommentRef = parentId
    ? doc(db, "lectureComments", parentId)
    : null;
  const commentRef = doc(collection(db, "lectureComments"));

  const commentDoc = {
    content,
    createdAt: serverTimestamp(),
    lectureId: lectureRef,
    parentId: parentId || null,
    replyCount: 0,
    updatedAt: serverTimestamp(),
    userId: userRef,
  };

  await runTransaction(db, async transaction => {
    if (parentId && parentCommentRef) {
      await increaseParentReplyCount(transaction, parentCommentRef);
    }

    transaction.set(commentRef, commentDoc);
    return { id: commentRef.id, ...commentDoc };
  });
};

export const useAddComment = () => {
  const queryClient = useQueryClient();

  return useMutation(addCommentToDB, {
    onSuccess: () => {
      queryClient.invalidateQueries(["comments"]);
    },
  });
};
