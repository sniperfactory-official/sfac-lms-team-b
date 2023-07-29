import { useState } from "react";
import { useDispatch } from "react-redux";
import { closeModal } from "@/redux/slice/classroomModalSlice";
import { DocumentData } from "firebase/firestore";

export const useLectureComment = () => {
  const dispatch = useDispatch();
  const [comments, setComments] = useState<DocumentData[]>([]);
  const [activeCommentIndex, setActiveCommentIndex] = useState<number | null>(
    null,
  );

  const handleComment = (text: string) => {
    setComments([...comments, { text, replies: [] }]);
    dispatch(closeModal());
  };

  const handleReply = (text: string) => {
    if (activeCommentIndex !== null) {
      const newComments = [...comments];
      newComments[activeCommentIndex].replies.push(text);
      setComments(newComments);
    }
  };

  return {
    comments,
    activeCommentIndex,
    handleComment,
    handleReply,
    setActiveCommentIndex,
  };
};
