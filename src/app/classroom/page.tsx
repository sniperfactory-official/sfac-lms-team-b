"use client";
import Aside from "@/app/classroom/(components)/Sidebar";
import ClassContent from "@/app/classroom/(components)/ClassContent";
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
    <div className="w-screen flex justify-center">
      <section className="w-4/5 flex mb-[20px]">
        <Aside courseList={courseList!} setCurrentCourse={setCurrentCourse} />
        <ClassContent currentCourse={currentCourse!} />
      </section>
    </div>
  );
};

export default Classroom;
