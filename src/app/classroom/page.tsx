"use client";
import Aside from "@/components/classroom/Aside";
import ClassContent from "@/components/classroom/ClassContent";
//import { useGetAssignment } from "@/hooks/queries/useCourseQueries";

const Classroom = () => {
  /*  const { data, isLoading, error } = useGetAssignment("lJWiLneoAspIqGZ2q48G");
  console.log(data); */

  return (
    <div className="w-screen h-screen flex justify-center">
      <section className="w-4/5 h-screen flex">
        <Aside />
        <ClassContent />
      </section>
    </div>
  );
};

export default Classroom;
