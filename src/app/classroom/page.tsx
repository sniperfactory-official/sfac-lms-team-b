"use client";
import Sidebar from "@/app/classroom/(components)/Sidebar";
import ClassContent from "@/app/classroom/(components)/ClassContent";
import useContentSyncer from "@/hooks/classroom/useContentSyncer";
import LoadingSpinner from "@/components/Loading/Loading";
import { getCookies } from "../api/cookie";
import { useEffect, useState } from "react";

export interface IUser {
  role : string | null;
  uid : string | null;
  name : string | null;
}

export default function Classroom(){
  const [user, setUser] = useState<IUser>({role: null, uid: null, name: null})
  useEffect(() => {
    const test = async() => {
      const res = await getCookies()
      setUser({role:res.role.value, uid:res.uid.value, name:res.name.value})
    }
    test()
  }, [])
  console.log(user);

  const { currentCourse, setCurrentCourse, courseList, isCourseListFetch } =
    useContentSyncer();

  if (isCourseListFetch || currentCourse === undefined || user === null)
    return (
      <div className="w-screen flex justify-center">
        <LoadingSpinner />
      </div>
    );

  return (
    <div className="w-screen flex justify-center">
      <section className="w-4/5 flex mb-[20px]">
        <Sidebar courseList={courseList!} setCurrentCourse={setCurrentCourse} user={user}/>
        <ClassContent currentCourse={currentCourse!} user={user}/>
      </section>
    </div>
  );
};
