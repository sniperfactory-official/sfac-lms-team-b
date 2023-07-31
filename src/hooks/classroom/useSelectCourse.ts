import React, { SetStateAction, useState, useEffect } from "react";
import { ICourseField } from "../queries/useGetCourseList";

interface IArg {
  courseList: ICourseField[];
  setCurrentCourse: React.Dispatch<React.SetStateAction<any>>;
}

// hook의 목적 : 선택된 Course관리

const useSelectCourse = ({ courseList, setCurrentCourse }: IArg) => {
  // [true, false, false] -> 첫 번째 course 선택으로 초기화
  const [selectedCourse, setSelectedCourse] = useState(
    Array.from({ length: courseList.length }, (_, idx) =>
      idx === 0 ? true : false,
    ),
  );
  // 클릭 시, 현재 선택한 Course데이터 state에 저장
  const handleCurrentCourse = ({
    course,
    idx,
  }: {
    course: ICourseField;
    idx: number;
  }) => {
    setCurrentCourse(course);
    setSelectedCourse(selectedCourse.map((_, index) => index === idx));
  };

  // 새로운 섹션 생성 시, useEffect로 업데이트
  useEffect(() => {
    setSelectedCourse(
      Array.from({ length: courseList.length }, (_, idx) =>
        idx === 0 ? true : false,
      ),
    );
  }, [courseList]);

  return { selectedCourse, handleCurrentCourse };
};

export default useSelectCourse;
