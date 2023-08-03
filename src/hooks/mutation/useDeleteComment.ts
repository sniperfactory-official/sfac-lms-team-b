import { useMutation, useQueryClient } from "@tanstack/react-query";
import { db } from "@/utils/firebase";
import { useDispatch } from "react-redux";
import {
  collection,
  doc,
  deleteDoc,
  query,
  where,
  getDocs,
  DocumentData,
  runTransaction,
} from "firebase/firestore";
import { setModalVisibility } from "@/redux/slice/classroomModalSlice";

const deleteCommentFromDB = async (commentId: string) => {
  const commentRef = doc(db, "lectureComments", commentId);

  await runTransaction(db, async transaction => {
    const commentSnap = await transaction.get(commentRef);
    if (!commentSnap.exists()) {
      throw Error("Comment does not exist!");
    }

    const comment = commentSnap.data();
    if (comment.parentId) {
      const parentCommentRef = doc(db, "lectureComments", comment.parentId);
      const parentCommentSnapshot = await transaction.get(parentCommentRef);
      if (!parentCommentSnapshot.exists()) {
        throw Error("Parent comment does not exist!");
      }
      const parentComment = parentCommentSnapshot.data();
      transaction.update(parentCommentRef, {
        replyCount: parentComment.replyCount - 1,
      });
    }

    transaction.delete(commentRef);

    const repliesQuery = query(
      collection(db, "lectureComments"),
      where("parentId", "==", commentId),
    );
    const repliesSnapshot = await getDocs(repliesQuery);
    repliesSnapshot.forEach(reply => {
      transaction.delete(reply.ref);
    });
  });
};

export const useDeleteComment = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  return useMutation(deleteCommentFromDB, {
    onSuccess: () => {
      queryClient.invalidateQueries(["comments"]);
      dispatch(
        setModalVisibility({ modalName: "commentModalOpen", visible: false }),
      );
      dispatch(
        setModalVisibility({
          modalName: "replyCommentModalOpen",
          visible: false,
        }),
      );
    },
  });
};
