import CourseList from "./sidebar/CourseList";
import { ICourseField } from "@/hooks/queries/useGetCourseList";
import SectionHandlerButton from "./sidebar/SectionHandlerButton";
import EditButton from "./sidebar/EditButton";
import useCreateCourseMutation from "@/hooks/mutation/useCreateCourseMutation";

interface IProps {
  courseList: ICourseField[];
  setCurrentCourse: React.Dispatch<React.SetStateAction<any>>;
}

const Sidebar = ({ courseList, setCurrentCourse }: IProps) => {
  const { mutate: createCourse, isLoading } = useCreateCourseMutation();

  return (
    <aside className="w-1/5 h-100 flex items-center flex-col mr-[20px] pt-[50px]">
      <CourseList courseList={courseList} setCurrentCourse={setCurrentCourse} />
      <SectionHandlerButton
        text="섹션 추가"
        src="/images/plus.svg"
        onClick={createCourse}
      />
      <EditButton />
    </aside>
  );
};

export default Sidebar;
