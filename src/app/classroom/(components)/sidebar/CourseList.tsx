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

interface IProps {
  courseList: ICourseField[];
  setCurrentCourse: React.Dispatch<React.SetStateAction<ICourseField>>;
}

const CourseList = ({ courseList, setCurrentCourse }: IProps) => {
  const isEditMode = useSelector(
    (state: RootState) => state.editCourse.isEditMode,
  );
  const dispatch = useDispatch();
  const selectedCourse = useSelector(
    (state: RootState) => state.editCourse.selectedCourse,
  );
  const { handleCurrentCourse, currentLectures, setCurrentLectures } =
    useSelectCourse({
      courseList,
      setCurrentCourse,
    });

  const moveItem = (dragIndex: number, hoverIndex: number) => {
    const dragItem = currentLectures[dragIndex];
    const newList = [...currentLectures];
    newList.splice(dragIndex, 1);
    newList.splice(hoverIndex, 0, dragItem);
    setCurrentLectures(newList);
  };

  return (
    // courseFiled 데이터 구조
    // courseData : {title: 'IT기본', createdAt: Timestamp, updatedAt: Timestamp}
    // courseId : "I7YsTuxOWvT1M2lakkAM"
    // lectureList : [{…}, {…}, {…}]
    // 2중 map, course순회 & course하위 lecture 순회
      courseList.map((course: ICourseField, idx: number) => (
        <React.Fragment key={idx}>
          <Element
            key={course.courseData.title}
            type="course"
            title={course.courseData.title}
            clickFn={() => {
              dispatch(setCourseId(course.courseId));
              handleCurrentCourse({ course, idx })!};
            }
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
              course.lectureList.map((lecture: ILecture) => (
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
