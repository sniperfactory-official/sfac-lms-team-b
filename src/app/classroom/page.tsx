"use client";
import Sidebar from "@/app/classroom/(components)/Sidebar";
import ClassContent from "@/app/classroom/(components)/ClassContent";
import useContentSyncer from "@/hooks/classroom/useContentSyncer";
import LoadingSpinner from "@/components/Loading/Loading";

const Classroom = () => {
  const { currentCourse, setCurrentCourse, courseList, isCourseListFetch } =
    useContentSyncer();

  if (isCourseListFetch || currentCourse === undefined)
    return (
        <div className="w-screen flex justify-center">
            <LoadingSpinner/>          
        </div>
    );

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
