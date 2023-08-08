import useDeleteCourse from "@/hooks/mutation/useDeleteCourse";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { handleEditMode } from "@/redux/slice/editCourseIdSlice";
import useUpdateLectureOrder from "@/hooks/mutation/useUpdateLectureOrder";
import useUpdateSectionTitle from "@/hooks/mutation/useUpdateSectionTitle";

interface IProp {
  type: "set" | "remove";
}

const SectionButton = ({ type }: IProp) => {
  const dispatch = useDispatch();
  const lectureCount = useSelector(
    (state: RootState) => state.editCourse.lectureCount,
  );
  const currentLectures = useSelector(
    (state: RootState) => state.editCourse.currentLectures,
  );
  const docId = useSelector((state:RootState) => state.editCourse.newTitleId)
  const newTitle = useSelector((state:RootState) => state.editCourse.newTitle)

  const { mutate: deleteCourse } = useDeleteCourse();
  const { mutate: updateLectureOrder } = useUpdateLectureOrder(currentLectures);
  const { mutate: updateSectionTitle } = useUpdateSectionTitle()
  const deleteIdArray = useSelector(
    (state: RootState) => state.editCourse.deleteIdArray,
  );
  const type_obj = {
    set: {
      text: "적용",
      bg: "bg-primary-80",
      onClick: () => {
        updateSectionTitle({docId, newTitle})
        updateLectureOrder(
          {},
          {
            onSuccess: () => {
              dispatch(handleEditMode());
            },
          },
        );
      },
    },
    remove: {
      text: "선택 삭제",
      bg: "bg-red",
      onClick: () =>
        deleteCourse(
          { deleteIdArray, lectureCount, currentLectures },
          {
            onSuccess: () => {
              dispatch(handleEditMode());
            },
          },
        ),
    },
  };
  return (
    <button
      className={`w-[115px] h-[35px] text-white ${type_obj[type].bg} rounded-lg text-[14px]`}
      onClick={type_obj[type].onClick}
    >
      {type_obj[type].text}
    </button>
  );
};

export default SectionButton;