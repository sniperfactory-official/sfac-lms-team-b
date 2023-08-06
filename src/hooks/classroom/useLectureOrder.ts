import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setCurrentLecture } from "@/redux/slice/editCourseIdSlice";
import { ICourseField } from "../queries/useGetCourseList";

const useLectureOrder = (courseList: ICourseField[]) => {
  const dispatch = useDispatch();
  const selectedCourse = useSelector(
    (state: RootState) => state.editCourse.selectedCourse,
  );
  // 수정 취소했을 시, order 이전 상태 되돌리는 trigger
  const [getBackLectureOrderTrigger, setGetBackLectureOrderTrigger] =
    useState<boolean>(false);

  useEffect(() => {
    const index = selectedCourse.findIndex(value => value === true);
    dispatch(setCurrentLecture(courseList[index].lectureList));
  }, [getBackLectureOrderTrigger]);

  return { getBackLectureOrderTrigger, setGetBackLectureOrderTrigger };
}

export default useLectureOrder;
