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

const deleteRegisteredAssignment = async (
  assignmentId: string,
  imageValue: string[],
) => {
  try {
    const assignmentRef = doc(db, "assignments", assignmentId);

    // storage Image 삭제
    if (imageValue.length > 0) {
      await Promise.all(
        imageValue.map(async url => {
          const newUrl = new URL(url);

          // 파일명 추출
          const fileName = decodeURIComponent(
            newUrl.pathname.split("/").pop()!,
          );

          const storageRef = ref(storage, fileName);

          await deleteObject(storageRef);
        }),
      );
    }
    // 과제삭제
    await deleteDoc(assignmentRef);

    const submittedAssignmentsQuery = query(
      collection(db, "submittedAssignments"),
      where("assignmentId", "==", assignmentRef),
    );

    const submittedAssignmentsDocs = await getDocs(submittedAssignmentsQuery);

    // 제출과제 삭제 및 제출한 과제 첨부파일 삭제
    await Promise.all(
      submittedAssignmentsDocs.docs.map(async document => {
        const feedbackDocs = await getDocs(
          collection(db, "submittedAssignments", document.id, "feedbacks"),
        );

        feedbackDocs.forEach(async feedbackDoc => {
          await deleteDoc(feedbackDoc.ref);
        });

        await deleteDoc(doc(db, "submittedAssignments", document.id));

        const attachmentsQuery = query(
          collection(db, "attachments"),
          where("submittedAssignmentId", "==", document.ref),
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

        await deleteDoc(doc(db, "attachments", attachmentDocs.id));
      }),
    );
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const useDeleteRegisteredAssignment = (
  assignmentId: string,
  imageValue: string[],
) => {
  const queryClient = useQueryClient();
  const { mutate, isLoading, error } = useMutation(
    () => deleteRegisteredAssignment(assignmentId, imageValue),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["getAssignment", assignmentId]);
      },
      onError: err => {
        console.log(err);
      },
    },
  );
  return { mutate, isLoading, error };
};

export { useDeleteRegisteredAssignment };
