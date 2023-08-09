import ContentCard from "./main/ContentCard";
import { ICourseField, ILecture } from "@/hooks/queries/useGetCourseList";
import useModalManage from "@/hooks/classroom/useModalManage";
import CourseInfo from "./main/CourseInfo";
import { IUser } from "../page";

interface IProps {
  currentCourse: ICourseField;
  user: IUser;
}

const ClassContent = ({ currentCourse, user }: IProps) => {
  const { modal: SelectedModal, handleModalOpen } = useModalManage();

  return (
    <div className="w-4/5 h-100 pt-[50px] ml-[50px]">
      <CourseInfo
        currentCourse={currentCourse}
        handleModalOpen={handleModalOpen}
        user={user}
      />
      {currentCourse.lectureList.map((lecture: ILecture) => (
        <ContentCard key={lecture.lectureId} lecture={lecture} />
      ))}
      {SelectedModal && <SelectedModal />}
    </div>
  );
};

export default ClassContent;
