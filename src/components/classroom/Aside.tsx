import { useState } from "react";
import CourseList from "./aside/CourseList";
import { ICourseField } from "@/hooks/queries/useGetCourseList";
import SectionHandlerButton from "./aside/SectionHandlerButton";
import AsideButton from "./aside/AsideButton";

interface IProps {
  courseList: ICourseField[];
  setCurrentCourse: React.Dispatch<React.SetStateAction<any>>;
}

const Aside = ({ courseList, setCurrentCourse }: IProps) => {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  return (
    <aside className="w-1/5 h-100 flex items-center flex-col mr-[20px] pt-[50px]">
      <CourseList
        courseList={courseList}
        isEditMode={isEditMode}
        setCurrentCourse={setCurrentCourse}
      />
      <SectionHandlerButton text="섹션 추가" src="/images/plus.svg" />
      <AsideButton isEditMode={isEditMode} setIsEditMode={setIsEditMode} />
    </aside>
  );
};

export default Aside;
