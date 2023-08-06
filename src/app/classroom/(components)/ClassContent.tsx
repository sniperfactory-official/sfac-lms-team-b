import ContentCard from "./main/ContentCard";
import { ICourseField, ILecture } from "@/hooks/queries/useGetCourseList";
import useModalManage from "@/hooks/classroom/useModalManage";
import CourseInfo from "./main/CourseInfo";

interface IProps {
  currentCourse: ICourseField;
}

const ClassContent = ({ currentCourse }: IProps) => {
  const { modal: SelectedModal, handleModalOpen } = useModalManage();

  return (
    <div className="w-4/5 h-100 pt-[50px] ml-[50px]">
      <CourseInfo currentCourse={currentCourse} handleModalOpen={handleModalOpen}/>
      {currentCourse.lectureList.map((lecture: ILecture) => (
        <ContentCard key={lecture.lectureId} lecture={lecture} />
      ))}
      {SelectedModal && <SelectedModal />}
    </div>
  );
};

export default ClassContent;
