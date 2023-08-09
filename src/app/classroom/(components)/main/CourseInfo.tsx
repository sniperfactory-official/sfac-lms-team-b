import { ICourseField } from "@/hooks/queries/useGetCourseList";
import { Button } from "sfac-designkit-react";
interface IProps {
  handleModalOpen: () => void;
  currentCourse: ICourseField;
  role: string;
}

const CourseInfo = ({ currentCourse, handleModalOpen, role }: IProps) => {
  return (
    <div className="flex justify-between w-100">
      <div className="flex flex-col w-[150px] mb-[20px]">
        <div className="text-lg font-bold w-[250px]">
          {currentCourse.courseData.title}
        </div>
        <div className="font-thin text-sm">
          강의 {currentCourse.lectureList.length}개
        </div>
      </div>
      {role === "관리자" && (
        <Button
          onClick={handleModalOpen}
          text="강의 만들기"
          asChild
          textSize="xs"
          className="w-[125px] h-[35px]"
        />
      )}
    </div>
  );
};

export default CourseInfo;
