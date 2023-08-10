"use client";
import Sidebar from "@/app/classroom/(components)/Sidebar";
import ClassContent from "@/app/classroom/(components)/ClassContent";
import useContentSyncer from "@/hooks/classroom/useContentSyncer";
import LoadingSpinner from "@/components/Loading/Loading";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export interface IUser {
  role: string | null;
  uid: string | null;
  name: string | null;
}

export default function Classroom() {
  const role = useSelector((state: RootState) => state.userInfo.role);
  const { currentCourse, setCurrentCourse, courseList, isCourseListFetch } =
    useContentSyncer();

  if (isCourseListFetch || currentCourse === undefined || role === undefined)
    return (
      <div className="w-screen flex justify-center">
        <LoadingSpinner />
      </div>
    );

  return (
    <div className="w-screen flex justify-center">
      <section className="w-4/5 flex mb-[20px]">
        <Sidebar
          courseList={courseList!}
          setCurrentCourse={setCurrentCourse}
          role={role}
        />
        <ClassContent currentCourse={currentCourse!} role={role} />
      </section>
    </div>
  );
}
