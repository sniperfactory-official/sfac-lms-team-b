import { useMutation, useQueryClient } from "@tanstack/react-query";
import { writeBatch, doc } from "firebase/firestore";
import { db } from "@utils/firebase";
import { AssignmentExtracted } from "@/app/assignment/(components)/AssignmentLeftNavContent";

// Firestore 데이터 추가
const updateAssignment = async (assignmentValue: AssignmentExtracted[]) => {
  try {
    // Get a new write batch
    const batch = writeBatch(db);

    assignmentValue.forEach((assign: AssignmentExtracted) => {
      const updateRef = doc(db, "assignments", assign.id);
      batch.update(updateRef, { order: assign.index });
    });

    // Commit the batch
    await batch.commit();
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const useUpdateAssignmentOrder = () => {
  const queryClient = useQueryClient();
  const { mutate, isLoading, error } = useMutation(
    (assignmentValue: AssignmentExtracted[]) => {
      return updateAssignment(assignmentValue);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["getAssignment", ""]);
      },
      onError: err => {
        console.log(err);
      },
    },
  );
  return { mutate, isLoading, error };
};

export { useUpdateAssignmentOrder };
