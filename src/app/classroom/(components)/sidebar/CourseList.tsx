import React, { useState } from "react";
import { ICourseField } from "@/hooks/queries/useGetCourseList";
import Element from "./Element";
import { Lecture } from "@/types/firebase.types";
import useSelectCourse from "@/hooks/classroom/useSelectCourse";

interface IProps {
  courseList: ICourseField[];
  isEditMode: boolean;
  setCurrentCourse: React.Dispatch<React.SetStateAction<any>>;
}

const CourseList = ({ courseList, isEditMode, setCurrentCourse }: IProps) => {
  const { selectedCourse, handleCurrentCourse } = useSelectCourse({
    courseList,
    setCurrentCourse,
  });
  return (
    // 2중 map, course순회 & course하위 lecture 순회
    <React.Fragment>
      {courseList.map((course: ICourseField, idx: number) => (
        <>
          <Element
            key={course.courseData.title}
            type="course"
            title={course.courseData.title}
            isEditMode={isEditMode}
            clickFn={() => handleCurrentCourse({ course, idx })!}
            isSelected={selectedCourse[idx]}
          />
          {/* 선택된 lecture만 보이도록 */}
          {selectedCourse[idx] &&
            course.lectureList.map((lecture: Lecture) => (
              <Element
                key={lecture.Id}
                type="lecture"
                title={lecture.title}
                isEditMode={isEditMode}
                isSelected={selectedCourse[idx]}
              />
            ))}
        </>
      ))}
    </React.Fragment>
  );
};

export default CourseList;
