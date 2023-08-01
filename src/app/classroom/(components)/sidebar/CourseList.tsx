import React from "react";
import { useDispatch } from "react-redux";
import Element from "./Element";
import { setCourseId } from "@/redux/slice/lectureInfoSlice";
import useSelectCourse from "@/hooks/classroom/useSelectCourse";
import { ICourseField, ILecture } from "@/hooks/queries/useGetCourseList";

interface IProps {
  courseList: ICourseField[];
  setCurrentCourse: React.Dispatch<React.SetStateAction<ICourseField>>;
}

const CourseList = ({ courseList, setCurrentCourse }: IProps) => {
  const dispatch = useDispatch();
  const { selectedCourse, handleCurrentCourse } = useSelectCourse({
    courseList,
    setCurrentCourse,
  });
  // fix to merge
  return (
    // courseFiled 데이터 구조
    // courseData : {title: 'IT기본', createdAt: Timestamp, updatedAt: Timestamp}
    // courseId : "I7YsTuxOWvT1M2lakkAM"
    // lectureList : [{…}, {…}, {…}]
    // 2중 map, course순회 & course하위 lecture 순회
    courseList.map((course: ICourseField, idx: number) => (
      <React.Fragment key={idx}>
        <Element
          type="course"
          title={course.courseData.title}
          clickFn={() => {
            dispatch(setCourseId(course.courseId));
            handleCurrentCourse({ course, idx })!;
          }}
          isSelected={selectedCourse[idx]}
          uniqueId={course.courseId}
          childCount={course.lectureList.length}
        />
        {/* 선택된 lecture만 보이도록 */}
        {selectedCourse[idx] &&
          course.lectureList.map((lecture: ILecture) => (
            <Element
              key={lecture.lectureId}
              type="lecture"
              title={lecture.title}
              isSelected={selectedCourse[idx]}
              uniqueId={lecture.lectureId}
            />
          ))}
      </React.Fragment>
    ))
  );
};

export default CourseList;
