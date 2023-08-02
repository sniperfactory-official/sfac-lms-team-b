"use client";
import Sidebar from "@/app/classroom/(components)/Sidebar";
import ClassContent from "@/app/classroom/(components)/ClassContent";
import useGetLectureList, {
  ICourseField,
} from "@/hooks/queries/useGetCourseList";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setSelectedCourse } from "@/redux/slice/editCourseIdSlice";
import { setCourseId } from "@/redux/slice/lectureInfoSlice";

const Classroom = () => {
  const [currentCourse, setCurrentCourse] = useState<ICourseField>();
  const dispatch = useDispatch();
  const { data: courseList, isLoading: isLectureListFetch } =
    useGetLectureList();

  useEffect(() => {
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
      // [true, false, false] -> 첫 번째 course 선택으로 초기화
    }
  }, [isLectureListFetch]);

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
