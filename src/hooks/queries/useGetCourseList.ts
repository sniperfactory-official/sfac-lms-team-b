import type { Course, Lecture } from "@/types/firebase.types";
import { db } from "@/utils/firebase";
import { useQuery } from "@tanstack/react-query";
import { collection, query, where, getDocs } from "firebase/firestore";
import { QUERY_KEY } from "@/constants/queryKey";

export interface ICourseField {
  courseData: Course;
  lectureList: ILecture[];
  courseId: string;
}

export interface ILecture extends Lecture {
  lectureId: string;
}

const fetchCourseList = async () => {
  const courseField: ICourseField[] = [];
  const courseQuery = query(collection(db, "courses"));
  const courseQuerySnapshot = await getDocs(courseQuery);
  const lectureQuery = query(collection(db, "lectures"));
  const lectureQuerySnapshot = await getDocs(lectureQuery);

  courseQuerySnapshot.forEach(courseDoc => {
    const lectureList: ILecture[] = [];
    const courseId = courseDoc.id;
    lectureQuerySnapshot.forEach(lectureDoc => {
      if (lectureDoc.data().courseId.id === courseDoc.id) {
        const lectureData = { ...lectureDoc.data(), lectureId: lectureDoc.id };
        lectureList.push(lectureData as ILecture);
      }
    });
    courseField.push({
      courseData: courseDoc.data() as Course,
      lectureList,
      courseId,
    });
  });
  return courseField;
  // courseFiled 데이터 구조
  // courseData : {title: 'IT기본', createdAt: Timestamp, updatedAt: Timestamp}
  // courseId : "I7YsTuxOWvT1M2lakkAM"
  // lectureList : [{…}, {…}, {…}]
};

const useGetCourseList = () => {
  return useQuery({
    queryKey: [QUERY_KEY.COURSE],
    queryFn: () => fetchCourseList(),
  });
};

export default useGetCourseList;
