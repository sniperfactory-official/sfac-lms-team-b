import useDeleteCourse from "@/hooks/mutation/useDeleteCourse";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { handleEditMode } from "@/redux/slice/editCourseIdSlice";

interface IProp {
  type: "set" | "remove";
}

const SectionButton = ({ type }: IProp) => {
  const dispatch = useDispatch();
  const { mutate: deleteCourse, isLoading } = useDeleteCourse();
  const deleteIdArray = useSelector(
    (state: RootState) => state.editCourse.deleteIdArray,
  );
  const type_obj = {
    set: {
      text: "적용",
      bg: "bg-primary-80",
      onClick: () => console.log("set"),
    },
    remove: {
      text: "선택 삭제",
      bg: "bg-red",
      onClick: () =>
        deleteCourse(
          { deleteIdArray },
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
