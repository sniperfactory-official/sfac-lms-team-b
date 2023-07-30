import { useMutation } from "@tanstack/react-query";
import { db } from "@/utils/firebase";
import { addDoc, collection, doc, serverTimestamp } from "firebase/firestore";

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
  return docRef.id;
};

export const useAddCommentMutation = () => {
  return useMutation(addCommentToDB);
};
