import ContentCard from "./main/ContentCard";
import { ICourseField, ILecture } from "@/hooks/queries/useGetCourseList";
import useModalManage from "@/hooks/classroom/useModalManage";

interface IProps {
  currentCourse: ICourseField;
}

const ClassContent = ({ currentCourse }: IProps) => {
  const {modal : SelectedModal, handleModalOpen} = useModalManage()

  return (
    <div className="w-4/5 h-100 pt-[50px] ml-[50px]">
      <div className="flex justify-between w-100">
        <div className="flex flex-col w-[150px] mb-[20px]">
          <div className="text-lg font-bold">
            {currentCourse.courseData.title}
          </div>
          <div className="font-thin text-sm">
            강의 {currentCourse.lectureList.length}개
          </div>
        </div>
        <button
          onClick={handleModalOpen}
          className="w-[109px] h-[35px] bg-primary-80 rounded-lg text-white text-sm"
        >
          강의 만들기
        </button>
      </div>
      {currentCourse.lectureList.map((lecture: ILecture) => (
        <ContentCard key={lecture.lectureId} lecture={lecture} />
      ))}
      {SelectedModal && <SelectedModal/>}
    </div>
  );
};

export default ClassContent;
