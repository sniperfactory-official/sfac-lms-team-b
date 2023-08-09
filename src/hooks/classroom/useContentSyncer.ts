"use client";
import useGetCourseList, {
  ICourseField,
} from "@/hooks/queries/useGetCourseList";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentLecture,
  setSelectedCourse,
} from "@/redux/slice/editCourseIdSlice";
import { setCourseId } from "@/redux/slice/lectureInfoSlice";
import { RootState } from "@/redux/store";
import { setLectureCount } from "@/redux/slice/editCourseIdSlice";

// 훅의 목적 : 강의 생성, 수정, 삭제에 따른 동기화 로직 분리.
const useContentSyncer = () => {
  const [currentCourse, setCurrentCourse] = useState<ICourseField>();
  const dispatch = useDispatch();
  const seletedCourse = useSelector(
    (state: RootState) => state.editCourse.selectedCourse,
  );
  const {
    data: courseList,
    isLoading: isCourseListFetch,
    isFetched,
    isFetching,
  } = useGetCourseList();

  useEffect(() => {
    if (!isCourseListFetch && courseList!.length !== 0) {
      // 처음에 첫 번째 course 선택
      setCurrentCourse(courseList![0]);
      dispatch(setCourseId(courseList![0].courseId));
      dispatch(
        setSelectedCourse(
          Array.from({ length: courseList!.length }, (_, idx) =>
            idx === 0 ? true : false,
          ),
        ),
      );
    }
  }, [isFetched]);

  // lecture 만들 경우 refech된 courseList setCurrentCourse통해서 반영
  useEffect(() => {
    if (!currentCourse) return;
    let SELECTED_COURSE_INDEX = 0;
    for (let i = 0; i < seletedCourse.length; i++) {
      if (seletedCourse[i] === true) {
        SELECTED_COURSE_INDEX = i;
        setCurrentCourse(courseList![SELECTED_COURSE_INDEX]);
        dispatch(
          setLectureCount(
            courseList![SELECTED_COURSE_INDEX].lectureList.length,
          ),
        );
        break;
      }
    }
  }, [isFetching, seletedCourse]);

  useEffect(() => {
    if (!currentCourse) return;
    let SELECTED_COURSE_INDEX = 0;
    for (let i = 0; i < seletedCourse.length; i++) {
      if (seletedCourse[i] === true) {
        SELECTED_COURSE_INDEX = i;
        setCurrentCourse(courseList![SELECTED_COURSE_INDEX]);
        dispatch(
          setLectureCount(
            courseList![SELECTED_COURSE_INDEX].lectureList.length,
          ),
        );
        dispatch(
          setCurrentLecture(courseList![SELECTED_COURSE_INDEX].lectureList),
        );
        break;
      }
    }
  }, [courseList]);

  return {
    currentCourse,
    setCurrentCourse,
    courseList,
    isCourseListFetch,
    isFetched,
    isFetching,
  };
};

export default useContentSyncer;
