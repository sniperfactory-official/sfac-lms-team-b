import useCreateCourseMutation from "../mutation/useCreateCourseMutation";

const useCreateSection = () => {
  const { mutate: createCourse } = useCreateCourseMutation();
  const handleCreateSection = () => {
    createCourse();
  };
  return { handleCreateSection };
};

export default useCreateSection;
