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
} from "firebase/firestore";
import { setModalVisibility } from "@/redux/slice/classroomModalSlice";

const deleteCommentFromDB = async (commentId: string) => {
  const commentRef = doc(db, "lectureComments", commentId);

  await deleteDoc(commentRef);

  const repliesQuery = query(
    collection(db, "lectureComments"),
    where("parentId", "==", commentId),
  );
  const repliesSnapshot = await getDocs(repliesQuery);
  repliesSnapshot.forEach(reply => {
    deleteDoc(reply.ref);
  });
};

export const useDeleteComment = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  return useMutation(deleteCommentFromDB, {
    onMutate: async (commentId: string) => {
      await queryClient.cancelQueries(["comments"]);
      const previousComments = queryClient.getQueryData<DocumentData[]>([
        "comments",
      ]);

      queryClient.setQueryData(
        ["comments"],
        (old: DocumentData[] | undefined) => {
          return old?.filter(
            comment =>
              comment.id !== commentId && comment.parentId !== commentId,
          );
        },
      );

      return { previousComments };
    },
    onError: (err, commentId, context: any) => {
      queryClient.setQueryData(["comments"], context.previousComments);
    },
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
