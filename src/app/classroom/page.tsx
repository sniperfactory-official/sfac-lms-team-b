"use client";
import Aside from "@/components/classroom/Aside";
import ClassContent from "@/components/classroom/ClassContent";
import useGetLectureList from "@/hooks/queries/useGetCourseList";
import { useState, useEffect } from "react";

const Classroom = () => {
  const { data: courseList, isLoading: isLectureListFetch } =
    useGetLectureList();
  const [currentCourse, setCurrentCourse] = useState<any>();

  useEffect(() => {
    if (!isLectureListFetch && courseList!.length !== 0) {
      setCurrentCourse(courseList![0]);
    }
  }, [isLectureListFetch]);

  if (isLectureListFetch || currentCourse === undefined)
    return <div>isLoading</div>;

  return (
    <div className="w-screen h-screen flex justify-center">
      <section className="w-4/5 h-screen flex">
        <Aside courseList={courseList!} setCurrentCourse={setCurrentCourse} />
        <ClassContent currentCourse={currentCourse!} />
      </section>
    </div>
  );
};

export default Classroom;
