import React from "react";
import { ICourseField } from "@/hooks/queries/useGetCourseList";
import Element from "./Element";
import useSelectCourse from "@/hooks/classroom/useSelectCourse";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setCourseId } from "@/redux/slice/lectureInfoSlice";
import LectureList from "./LectureList";

interface IProps {
  courseList: ICourseField[];
  setCurrentCourse: React.Dispatch<React.SetStateAction<ICourseField>>;
}

const CourseList = ({ courseList, setCurrentCourse }: IProps) => {
  const dispatch = useDispatch();

  const selectedCourse = useSelector(
    (state: RootState) => state.editCourse.selectedCourse,
  );
  // 현재 선택된 Course 관리 custom hook
  const { handleCurrentCourse, currentLectures } = useSelectCourse({
    courseList,
    setCurrentCourse,
  });

  return courseList.map((course: ICourseField, idx: number) => (
    <React.Fragment key={idx}>
      <Element
        key={course.courseData.title}
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
      {selectedCourse[idx] && (
        <LectureList currentLectures={currentLectures} idx={idx} />
      )}
    </React.Fragment>
  ));
};

export default CourseList;
