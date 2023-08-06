import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { handleEditMode } from "@/redux/slice/editCourseIdSlice";

const useEditMode = () => {
  const dispatch = useDispatch();
  const isEditMode = useSelector(
    (state: RootState) => state.editCourse.isEditMode,
  );

  const handleEditStatus = () => dispatch(handleEditMode());

  return { isEditMode, handleEditStatus };
};

export default useEditMode;
