import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateDoc, doc, DocumentReference } from "firebase/firestore";
import { db } from "@utils/firebase";
import {AssignmentExtractedPicked} from '@/app/assignment/(components)/AssignmentLeftNavContent'


// Firestore 데이터 추가
const updateAssignment = async (newOrder: Number, assignmentId:string) => {
  try {
    const updatedAssignment = await updateDoc(
      doc(db, "assignments", assignmentId),
      { order : newOrder },
    );
    return updatedAssignment;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const useUpdateAssignment = (assignmentValue:AssignmentExtractedPicked[]) => {
  const queryClient = useQueryClient();
  const { mutate, isLoading, error } = useMutation(
    (assignmentId: string) => {
      const updatingAssignment = assignmentValue.find((assign)=>assign.id === assignmentId);
      const newOrder = updatingAssignment.order
    return(updateAssignment(newOrder, assignmentId))}, 
  {
    onSuccess: () => {
      queryClient.invalidateQueries(["getAssignment", ""]);
    },
    onError: err => {
      console.log(err);
    },
  });
  return { mutate, isLoading, error };
};

export { useUpdateAssignment };
