import { FormEvent } from "react";
import { useAddComment } from "@/hooks/mutation/useAddComment";
import { useDispatch } from "react-redux";
import { setModalVisibility } from "@/redux/slice/classroomModalSlice";

interface SubmitCommentData {
  content: string;
  lectureId: string;
  parentId: string;
  userId: string;
  isReply?: boolean;
}

export const useSubmitComment = () => {
  const dispatch = useDispatch();
  const mutation = useAddComment();

  const handleSubmit = async (
    data: SubmitCommentData,
    e: FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    try {
      await mutation.mutateAsync({
        ...data,
        parentId: data.parentId ?? "",
      });
      if (!data.isReply) {
        dispatch(
          setModalVisibility({
            modalName: "commentModalOpen",
            visible: false,
            modalRole: "create",
          }),
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  return handleSubmit;
};
