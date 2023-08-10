import ContentCard from "./main/ContentCard";
import { ICourseField, ILecture } from "@/hooks/queries/useGetCourseList";
import useModalManage from "@/hooks/classroom/useModalManage";
import CourseInfo from "./main/CourseInfo";
import EmptyContents from "@/components/EmptyContents";

interface IProps {
  currentCourse: ICourseField;
  role: string;
}
const ClassContent = ({ currentCourse, role }: IProps) => {
  const { modal: SelectedModal, handleModalOpen } = useModalManage();

  return (
    <div className="w-4/5 h-100 ml-[50px]">
      <CourseInfo
        currentCourse={currentCourse}
        handleModalOpen={handleModalOpen}
        role={role}
      />
      {currentCourse.lectureList.length === 0 ? (
        <EmptyContents emptyTxt={"강의가 아직 존재하지 않습니다."} />
      ) : (
        currentCourse.lectureList.map((lecture: ILecture) => {
          if (role === "수강생" && lecture.isPrivate) {
            return null; // 수강생이면서 강의가 비공개인 경우 렌더링하지 않습니다.
          }
          return (
            <ContentCard
              key={lecture.lectureId}
              lecture={lecture}
              role={role}
            />
          );
        })
      )}
      {SelectedModal && <SelectedModal />}
    </div>
  );
};

export default ClassContent;
