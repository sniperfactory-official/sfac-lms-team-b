import React from "react";
import { ICourseField } from "@/hooks/queries/useGetCourseList";
import Element from "./Element";
import { Lecture } from "@/types/firebase.types";

interface IProps {
  courseList: ICourseField[];
  isEditMode: boolean;
  setCurrentCourse: React.Dispatch<React.SetStateAction<any>>;
}

const CourseList = ({ courseList, isEditMode, setCurrentCourse }: IProps) => {
  const handleCurrentCourse = (course: ICourseField) => {
    setCurrentCourse(course);
  };

  return (
    <React.Fragment>
      {courseList.map((course: ICourseField) => (
        <>
          <Element
            key={course.courseData.title}
            type="course"
            title={course.courseData.title}
            isEditMode={isEditMode}
            clickFn={() => handleCurrentCourse(course)!}
          />
          {course.lectureList.map((lecture: Lecture) => (
            <Element
              key={lecture.id}
              type="lecture"
              title={lecture.title}
              isEditMode={isEditMode}
            />
          ))}
        </>
      ))}
    </React.Fragment>
  );
};

export default CourseList;
