import React from "react";
import useCreateCourseMutation from "../mutation/useCreateCourseMutation";
import { ICourseField } from "../queries/useGetCourseList";
import { useDispatch } from "react-redux";
import { setSelectedCourse } from "@/redux/slice/editCourseIdSlice";

interface IProps {
  setCurrentCourse: React.Dispatch<React.SetStateAction<ICourseField>>;
  courseList: ICourseField[];
}

const useCreateSection = ({ courseList, setCurrentCourse }: IProps) => {
  const dispatch = useDispatch();
  const { mutate: createCourse } = useCreateCourseMutation();
  const handleCreateSection = () => {
    createCourse();
    setCurrentCourse(courseList![0]);
    dispatch(
      setSelectedCourse(
        Array.from({ length: courseList.length }, (_, idx) =>
          idx === 0 ? true : false,
        ),
      ),
    );
  };
  return { handleCreateSection };
};

export default useCreateSection;
