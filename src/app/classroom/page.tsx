"use client";
import Sidebar from "@/app/classroom/(components)/Sidebar";
import ClassContent from "@/app/classroom/(components)/ClassContent";
import useGetLectureList, {
  ICourseField,
} from "@/hooks/queries/useGetCourseList";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedCourse } from "@/redux/slice/editCourseIdSlice";
import { setCourseId } from "@/redux/slice/lectureInfoSlice";
import { RootState } from "@/redux/store";

const Classroom = () => {
  const [currentCourse, setCurrentCourse] = useState<ICourseField>();
  const dispatch = useDispatch();
  const seletedCourse = useSelector(
    (state: RootState) => state.editCourse.selectedCourse,
  );
  const {
    data: courseList,
    isLoading: isLectureListFetch,
    isFetched,
    isFetching,
  } = useGetLectureList();
  console.log(courseList);
  useEffect(() => {
    console.log("isFetched useEffect");

    if (!isLectureListFetch && courseList!.length !== 0) {
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
    let SELECTED_COURSE_INDEX = 0;
    for (let i = 0; i < seletedCourse.length; i++) {
      if (seletedCourse[i] === true) {
        SELECTED_COURSE_INDEX = i;
        setCurrentCourse(courseList![SELECTED_COURSE_INDEX]);
        break;
      }
    }
  }, [isFetching, seletedCourse]);

  if (isLectureListFetch || currentCourse === undefined)
    return <div>isLoading</div>;

  return (
    <div className="w-screen flex justify-center">
      <section className="w-4/5 flex mb-[20px]">
        <Sidebar courseList={courseList!} setCurrentCourse={setCurrentCourse} />
        <ClassContent currentCourse={currentCourse!} />
      </section>
    </div>
  );
};

export default Classroom;
