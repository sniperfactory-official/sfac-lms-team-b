import type { Course, Lecture } from "@/types/firebase.Types";
import { db } from "@/utils/firebase";
import { useQuery } from "@tanstack/react-query";
import { collection, query, where, getDocs } from "firebase/firestore";
import { QUERY_KEY } from "@/constants/queryKey";

export interface ICourseField {
  courseData: Course;
  lectureList: Lecture[];
}

const fetchCourseList = async () => {
  const courseField: ICourseField[] = [];
  const courseQuery = query(collection(db, "courses"));
  const courseQuerySnapshot = await getDocs(courseQuery);
  const lectureQuery = query(collection(db, "lectures"));
  const lectureQuerySnapshot = await getDocs(lectureQuery);

  courseQuerySnapshot.forEach(courseDoc => {
    const lectureList: Lecture[] = [];
    lectureQuerySnapshot.forEach(lectureDoc => {
      if (lectureDoc.data().courseId.id === courseDoc.id) {
        lectureList.push(lectureDoc.data() as Lecture);
      }
    });
    courseField.push({
      courseData: courseDoc.data() as Course,
      lectureList,
    });
  });
  return courseField;
};

const useGetCourseList = () => {
  return useQuery<Course[]>({
    queryKey: [QUERY_KEY.COURSE],
    queryFn: () => fetchCourseList(),
  });
};

export default useGetCourseList;
