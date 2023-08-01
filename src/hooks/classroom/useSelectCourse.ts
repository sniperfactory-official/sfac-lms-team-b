import React, { useState, useEffect } from "react";
import { ICourseField } from "../queries/useGetCourseList";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

interface IArg {
  courseList: ICourseField[];
  setCurrentCourse: React.Dispatch<React.SetStateAction<ICourseField>>;
}

// hook의 목적 : 선택된 Course관리

const useSelectCourse = ({ courseList, setCurrentCourse }: IArg) => {
  const isEditMode = useSelector(
    (state: RootState) => state.editCourse.isEditMode,
  );
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
    // 수정 상태일 경우 다른 Course 선택 X
    if (!isEditMode) {
      setCurrentCourse(course);
      setSelectedCourse(selectedCourse.map((_, index) => index === idx));
    }
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
