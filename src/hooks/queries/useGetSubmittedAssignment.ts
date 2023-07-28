import { useQuery } from "@tanstack/react-query";
import {
  collection,
  getDoc,
  getDocs,
  doc,
  query,
  where,
} from "firebase/firestore";

import { db } from "@utils/firebase";
import { SubmittedAssignment } from "@/types/firebase.types";

const getSubmittedAssignments = async (
  assignmentId: string,
): Promise<SubmittedAssignment[]> => {
  // if (role === "수강생") {

  // const qwe = getDocs(collection(db, "submittedAssignments"));
  // const asd = (await qwe)?.docs.map((doc: any) => doc.data());
  // return asd;
  // }

  // if (role === "관리자") {
  const assignmentIdToQuery = "yjQmFY45VoZduNQ4Twxy";
  const assignmentRef = doc(db, "assignments", assignmentIdToQuery);
  const assignmentSnapshot = await getDoc(assignmentRef);

  const q = query(
    collection(db, "submittedAssignments"),
    where("assignmentId", "==", assignmentSnapshot.ref),
  );
  const submittedAssignmentsDocs = await getDocs(q);
  const submittedAssignments = submittedAssignmentsDocs?.docs.map(doc => {
    return { id: doc.id, ...doc.data() } as SubmittedAssignment;
  });

  return submittedAssignments;

  // }

  // if(강사) { 해당assignment Id에 일치하는 모든 submittedAssignments 불러오기}
};
const useGetSubmittedAssignments = (assignmentId: string) => {
  // 파라미터로 Role을 받아와 수강생이면 ~~, 강사면~~실행
  const { data, isLoading, error } = useQuery(
    ["getSubmittedAssignment", assignmentId],
    () => getSubmittedAssignments(assignmentId),
    {
      refetchOnWindowFocus: false,
    },
  );

  return { data, isLoading, error };
};

export { useGetSubmittedAssignments };
