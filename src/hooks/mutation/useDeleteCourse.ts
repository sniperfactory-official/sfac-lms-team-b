import { doc, deleteDoc } from "firebase/firestore";
import { db } from "@utils/firebase";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "@/constants/queryKey";

interface IDeleteId {
  type: "course" | "lecture";
  id: string;
}

const deleteCourses = async ({
  deleteIdArray,
  lectureCount,
}: {
  deleteIdArray: IDeleteId[];
  lectureCount: number;
}) => {
  console.log(deleteIdArray);

  try {
    if (lectureCount + 1 !== deleteIdArray.length) {
      return alert("아직 남아있는 강의가 있습니다");
    }
    // 각 courseId에 대해 deleteDoc 작업을 수행하고, 결과 Promise들을 배열로 만듭니다.
    const deletePromises = deleteIdArray.map(({ id, type }) => {
      if (type === "course") {
        deleteDoc(doc(db, "courses", id));
      } else if (type === "lecture") {
        deleteDoc(doc(db, "lectures", id));
      }
    });

    // Promise.all을 사용하여 모든 삭제 작업이 완료될 때까지 기다립니다.
    await Promise.all(deletePromises);
  } catch (error) {
    console.error("Error removing documents: ", error);
  }
};
const useDeleteCourse = () => {
  const queryClient = useQueryClient();

  return useMutation(deleteCourses, {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEY.COURSE);
    },
  });
};

export default useDeleteCourse;
