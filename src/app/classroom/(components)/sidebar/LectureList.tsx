import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { ILecture } from "@/hooks/queries/useGetCourseList";
import DndItem from "./DndItem";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setCurrentLecture } from "@/redux/slice/editCourseIdSlice";
import Element from "./Element";
import useEditMode from "@/hooks/classroom/useEditMode";

interface IProps {
  currentLectures: ILecture[];
  idx: number;
  role: string;
}

const LectureList = ({ currentLectures, idx, role }: IProps) => {
  const dispatch = useDispatch();
  const { isEditMode } = useEditMode();
  const selectedCourse = useSelector(
    (state: RootState) => state.editCourse.selectedCourse,
  );

  const moveItem = (dragIndex: number, hoverIndex: number) => {
    const dragItem = currentLectures[dragIndex];
    const newList = [...currentLectures];
    newList.splice(dragIndex, 1);
    newList.splice(hoverIndex, 0, dragItem);
    dispatch(setCurrentLecture(newList));
  };

  return isEditMode ? (
    <DndProvider backend={HTML5Backend}>
      {currentLectures.map((lecture: ILecture, index: number) => {
        if (role === "수강생" && lecture.isPrivate) {
          return null; // 수강생이면서 강의가 비공개인 경우 렌더링하지 않습니다.
        }
        return (
          <DndItem
            key={lecture.lectureId}
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
        );
      })}
    </DndProvider>
  ) : (
    currentLectures.map((lecture: ILecture) => {
      if (role === "수강생" && lecture.isPrivate) {
        return null; // 수강생이면서 강의가 비공개인 경우 렌더링하지 않습니다.
      }
      return (
        <Element
          key={lecture.lectureId}
          type="lecture"
          title={lecture.title}
          isSelected={selectedCourse[idx]}
          uniqueId={lecture.lectureId}
        />
      );
    })
  );
};

export default LectureList;
