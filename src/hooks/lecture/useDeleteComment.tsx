import { useMutation } from "@tanstack/react-query";
import { db } from "@/utils/firebase";
import { collection, doc, deleteDoc, query, where, getDocs } from "firebase/firestore";

const deleteCommentFromDB = async (commentId: string) => {
  const commentRef = doc(db, "lectureComments", commentId);
  
  await deleteDoc(commentRef);

  const repliesQuery = query(collection(db, "lectureComments"), where("parentId", "==", commentId));
  const repliesSnapshot = await getDocs(repliesQuery);
  repliesSnapshot.forEach((reply) => {
    deleteDoc(reply.ref);
  });
};

export const useDeleteComment = () => {
  return useMutation(deleteCommentFromDB);
};
