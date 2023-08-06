import { ICourseField } from "@/hooks/queries/useGetCourseList"

interface IProps{
  handleModalOpen : () => void;
  currentCourse: ICourseField;
}

const CourseInfo = ({currentCourse, handleModalOpen}:IProps) => {
  return (
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
  )
}

export default CourseInfo