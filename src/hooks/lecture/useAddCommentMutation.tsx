import { useMutation, useQueryClient } from "@tanstack/react-query";
import { db } from "@/utils/firebase";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
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

  const commentRef = collection(db, "lectureComments");
  const commentDoc = {
    content,
    createdAt: serverTimestamp(),
    lectureId: lectureRef,
    parentId,
    replyCount: 0,
    timestamp: "",
    updatedAt: serverTimestamp(),
    userId: userRef,
  };
  const docRef = await addDoc(commentRef, commentDoc);
  return { id: docRef.id, ...commentDoc };
};

export const useAddCommentMutation = () => {
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
