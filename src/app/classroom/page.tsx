"use client";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Sidebar from "@/app/classroom/(components)/Sidebar";
import ClassContent from "@/app/classroom/(components)/ClassContent";
import { setCourseId } from "@/redux/slice/lectureInfoSlice";
import useGetLectureList, {
  ICourseField,
} from "@/hooks/queries/useGetCourseList";

const Classroom = () => {
  const dispatch = useDispatch();
  const [currentCourse, setCurrentCourse] = useState<ICourseField>();
  const { data: courseList, isLoading: isLectureListFetch } =
    useGetLectureList();

  useEffect(() => {
    if (!isLectureListFetch && courseList!.length !== 0) {
      setCurrentCourse(courseList![0]);
      dispatch(setCourseId(courseList![0].courseId));
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
