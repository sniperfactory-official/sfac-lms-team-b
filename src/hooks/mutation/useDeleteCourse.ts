import {
  doc,
  deleteDoc,
  updateDoc,
  collection,
  query,
  getDocs,
} from "firebase/firestore";
import { db } from "@utils/firebase";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "@/constants/queryKey";
import { ILecture } from "../queries/useGetCourseList";
import { Course } from "@/types/firebase.types";

interface IDeleteId {
  type: "course" | "lecture";
  id: string;
}

interface IBeforeSortedCourse {
  courseDoc: Course;
  courseId: string;
}
const updateCourseOrder = async () => {
  const courseQuery = query(collection(db, "courses"));
  const courseQuerySnapshot = await getDocs(courseQuery);
  const beforeSortedCourse: IBeforeSortedCourse[] = [];

  courseQuerySnapshot.forEach(courseDoc => {
    const courseId = courseDoc.id;
    beforeSortedCourse.push({
      courseDoc: courseDoc.data() as Course,
      courseId,
    });
  });
  // order순으로 정렬
  // order index로 업데이트

  beforeSortedCourse.sort((a, b) => a.courseDoc.order - b.courseDoc.order);
  for (let i = 0; i < beforeSortedCourse.length; i++) {
    const docRef = doc(db, "courses", beforeSortedCourse[i].courseId);
    await updateDoc(docRef, {
      order: i,
    });
  }
};

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

    if (isIncludeCourse && lectureCount + 1 === deleteIdArray.length) {
      // course가 삭제 되었으므로 course order 업데이트 로직
      updateCourseOrder();
    } else {
      const leftLectures = currentLectures.filter(
        aItem => !deleteIdArray.some(bItem => aItem.lectureId === bItem.id),
      );
      // leture order순 정렬
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
