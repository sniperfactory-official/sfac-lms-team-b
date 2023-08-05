import { useQuery } from "@tanstack/react-query";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "@utils/firebase";

const deleteSubmittedAssignment = async (submittedAssimentId: string) => {
  // 관리자의 feedback 없을때 해당과제만 삭제
  const deleteFeedbacks = await deleteDoc(
    doc(db, "submittedAssignments", "제출된 과제의 ID"),
  );
  return deleteFeedbacks;
};

const useDeleteSubmittedAssignment = (submittedAssimentId: string) => {
  const { data, isLoading, error } = useQuery(
    ["deleteSubmittedAssignment", submittedAssimentId],
    () => deleteSubmittedAssignment(submittedAssimentId),
    {
      cacheTime: 0, // 삭제 기능 이므로 cacheTime 0
      refetchOnWindowFocus: false,
    },
  );

  return { data, isLoading, error };
};

export { useDeleteSubmittedAssignment };

// 시간순으로 정렬하기.
