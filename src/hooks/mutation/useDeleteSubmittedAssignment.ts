import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  doc,
  deleteDoc,
  query,
  collection,
  where,
  getDocs,
} from "firebase/firestore";
import { db, storage } from "@utils/firebase";
import { deleteObject, ref } from "firebase/storage";

const deleteSubmittedAssignment = async (
  submittedAssignmentId: string,
  userId: string,
) => {
  try {
    const submittedAssignmentRef = doc(
      db,
      "submittedAssignments",
      submittedAssignmentId,
    );
    const userRef = doc(db, "users", userId);

    const attachmentsQuery = query(
      collection(db, "attachments"),
      where("submittedAssignmentId", "==", submittedAssignmentRef),
      where("userId", "==", userRef),
    );

    const attachmentDocs = (await getDocs(attachmentsQuery)).docs[0];

    if (attachmentDocs.data().links.includes("")) {
      await Promise.all(
        attachmentDocs.data().attachmentFiles.map(async (file: any) => {
          const storageRef = ref(storage, `attachments/${file.name}`);
          await deleteObject(storageRef);
        }),
      );
    }

    const feedbackDocs = await getDocs(
      collection(
        db,
        "submittedAssignments",
        submittedAssignmentId,
        "feedbacks",
      ),
    );

    feedbackDocs.forEach(async feedbackDoc => {
      await deleteDoc(feedbackDoc.ref);
    });

    await deleteDoc(doc(db, "submittedAssignments", submittedAssignmentId));
    await deleteDoc(doc(db, "attachments", attachmentDocs.id));
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const useDeleteSubmittedAssignment = (assignmentId: string, userId: string) => {
  const queryClient = useQueryClient();
  const { mutate, isLoading, error } = useMutation(
    (submittedAssimentId: string) =>
      deleteSubmittedAssignment(submittedAssimentId, userId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([
          "getSubmittedAssignment",
          assignmentId,
          userId,
        ]);
        queryClient.invalidateQueries([
          "getSubmittedAssignment",
          assignmentId,
          "",
        ]);
      },
      onError: err => {
        console.log(err);
      },
    },
  );
  return { mutate, isLoading, error };
};

export { useDeleteSubmittedAssignment };

// 시간순으로 정렬하기.
