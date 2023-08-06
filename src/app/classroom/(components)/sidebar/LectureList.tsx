import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { ILecture } from "@/hooks/queries/useGetCourseList"
import DndItem from "./DndItem"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/redux/store"
import { setCurrentLecture } from "@/redux/slice/editCourseIdSlice";
import Element from "./Element"
import useEditMode from "@/hooks/classroom/useEditMode"

interface IProps {
  currentLectures: ILecture[];
  idx: number;
}

const LectureList = ({currentLectures, idx}:IProps) => {
  const dispatch = useDispatch()
  const {isEditMode} = useEditMode()
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
  
  return (
    isEditMode ? (
      <DndProvider backend={HTML5Backend}>
        {currentLectures.map((lecture: ILecture, index: number) => (
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
    )
  )
}

export default LectureList