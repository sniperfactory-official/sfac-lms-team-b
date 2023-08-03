import React from "react";
import { ICourseField, ILecture } from "@/hooks/queries/useGetCourseList";
import Element from "./Element";
import useSelectCourse from "@/hooks/classroom/useSelectCourse";
import { useDispatch, useSelector } from "react-redux";
import { HTML5Backend } from "react-dnd-html5-backend";
import { RootState } from "@/redux/store";
import { DndProvider } from "react-dnd";
import DndItem from "./DndItem";
import { setCourseId } from "@/redux/slice/lectureInfoSlice";
import { setCurrentLecture } from "@/redux/slice/editCourseIdSlice";

interface IProps {
  courseList: ICourseField[];
  setCurrentCourse: React.Dispatch<React.SetStateAction<ICourseField>>;
}

const CourseList = ({ courseList, setCurrentCourse }: IProps) => {
  const dispatch = useDispatch();
  const isEditMode = useSelector(
    (state: RootState) => state.editCourse.isEditMode,
  );
  const selectedCourse = useSelector(
    (state: RootState) => state.editCourse.selectedCourse,
  );
  // 현재 선택된 Course 관리 custom hook
  const { handleCurrentCourse, currentLectures } = useSelectCourse({
    courseList,
    setCurrentCourse,
  });

  const moveItem = (dragIndex: number, hoverIndex: number) => {
    const dragItem = currentLectures[dragIndex];
    const newList = [...currentLectures];
    newList.splice(dragIndex, 1);
    newList.splice(hoverIndex, 0, dragItem);
    dispatch(setCurrentLecture(newList));
  };

  return (
    courseList.map((course: ICourseField, idx: number) => (
      <React.Fragment key={idx}>
        <Element
          key={course.courseData.title}
          type="course"
          title={course.courseData.title}
          clickFn={() => {
            dispatch(setCourseId(course.courseId));
            handleCurrentCourse({ course, idx })!;
          }}
          isSelected={selectedCourse[idx]}
          uniqueId={course.courseId}
          childCount={course.lectureList.length}
        />
        {/* 선택된 lecture만 보이도록 */}
        {selectedCourse[idx] &&
          (isEditMode ? (
            <DndProvider backend={HTML5Backend}>
              {currentLectures.map((lecture: ILecture, index: number) => (
                <DndItem
                  key={lecture.id}
                  index={index}
                  id={lecture.lectureId}
                  moveItem={(dragIndex, hoverIndex) =>
                    moveItem(dragIndex, hoverIndex)
                  }
                  child={
                    <Element
                      type="lecture"
                      title={lecture.title}
                      isSelected={selectedCourse[idx]}
                      uniqueId={lecture.lectureId}
                    />
                  }
                />
              ))}
            </DndProvider>
          ) : (
            currentLectures.map((lecture: ILecture) => (
              <Element
                key={lecture.lectureId}
                type="lecture"
                title={lecture.title}
                isSelected={selectedCourse[idx]}
                uniqueId={lecture.lectureId}
              />
            ))
          ))}
      </React.Fragment>
    ))
  );
};

export default CourseList;
