import ContentCard from "./main/ContentCard";
import { Lecture } from "@/types/firebase.Types";
import { ICourseField } from "@/hooks/queries/useGetCourseList";

interface IProps {
  currentCourse: ICourseField;
}

const ClassContent = ({ currentCourse }: IProps) => {
  return (
    <div className="w-4/5 h-100 pt-[100px] ml-[50px]">
      <div className="flex justify-between w-100">
        <div className="flex flex-col w-[150px] mb-[20px]">
          <div className="text-lg font-bold">
            {currentCourse.courseData.title}
          </div>
          <div className="font-thin text-sm">
            강의 {currentCourse.lectureList.length}개
          </div>
        </div>
        <button className="w-[109px] h-[35px] bg-primary-80 rounded-lg text-white text-sm">
          강의 만들기
        </button>
      </div>
      {currentCourse.lectureList.map((lecture: Lecture) => (
        <ContentCard key={lecture.title} lecture={lecture} />
      ))}
    </div>
  );
};

export default ClassContent;
