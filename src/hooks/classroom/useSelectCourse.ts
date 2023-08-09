import React, { SetStateAction, useState, useEffect } from "react";
import { ICourseField, ILecture } from "../queries/useGetCourseList";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useDispatch } from "react-redux";
import {
  setSelectedCourse,
  setCurrentLecture,
} from "@/redux/slice/editCourseIdSlice";
interface IArg {
  courseList: ICourseField[];
  setCurrentCourse: React.Dispatch<React.SetStateAction<ICourseField>>;
}

// hook의 목적 : 선택된 Course관리
const useSelectCourse = ({ courseList, setCurrentCourse }: IArg) => {
  // 선택된 course의 lecture state 관리
  const dispatch = useDispatch();

  const isEditMode = useSelector(
    (state: RootState) => state.editCourse.isEditMode,
  );
  const selectedCourse = useSelector(
    (state: RootState) => state.editCourse.selectedCourse,
  );
  const currentLectures = useSelector(
    (state: RootState) => state.editCourse.currentLectures,
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
      dispatch(setCurrentLecture(course.lectureList));
      dispatch(
        setSelectedCourse(selectedCourse.map((_, index) => index === idx)),
      );
    }
  };

  // 새로운 섹션 생성 및 삭제 시, useEffect로 업데이트
  useEffect(() => {
    dispatch(
      setSelectedCourse(
        Array.from({ length: courseList.length }, (_, idx) =>
          idx === 0 ? true : false,
        ),
      ),
    );
    dispatch(setCurrentLecture(courseList[0].lectureList));
  }, [courseList.length]);

  return { handleCurrentCourse, currentLectures };
};

export default useSelectCourse;
