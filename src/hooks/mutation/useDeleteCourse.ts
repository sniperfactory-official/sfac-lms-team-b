import { doc, deleteDoc, updateDoc} from "firebase/firestore";
import { db } from "@utils/firebase";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "@/constants/queryKey";
import { ILecture } from "../queries/useGetCourseList";

interface IDeleteId {
  type: "course" | "lecture";
  id: string;
}

const deleteCourses = async ({
  deleteIdArray,
  lectureCount,
  currentLectures,
}: {
  deleteIdArray: IDeleteId[];
  lectureCount: number;
  currentLectures: ILecture[];
}) => {
  try {
    let isIncludeCourse = false;
    for (let i = 0; i < deleteIdArray.length; i++) {
      if (deleteIdArray[i].type === "course") {
        isIncludeCourse = true;
      }
    }
    if (isIncludeCourse && lectureCount + 1 !== deleteIdArray.length) {
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
    
    if(isIncludeCourse && lectureCount + 1 === deleteIdArray.length){

    }else{
      const leftLectures = currentLectures.filter(aItem => !deleteIdArray.some(bItem => aItem.lectureId === bItem.id));
      console.log(currentLectures, 'current');
      console.log(deleteIdArray, 'delete Array');
      console.log(leftLectures, 'left');
      for (let i = 0; i < leftLectures.length; i++) {
        const docRef = doc(db, "lectures", leftLectures[i].lectureId);
        await updateDoc(docRef, {
          order: i + 1,
        });
      }
    }
  } catch (error) {
    console.error("Error removing documents: ", error);
  }
};
const useDeleteCourse = () => {
  const queryClient = useQueryClient();

  return useMutation(deleteCourses, {
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEY.COURSE]);
    },
  });
};

export default useDeleteCourse;
