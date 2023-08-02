import { LectureContent } from "@/types/firebase.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { db } from "@/utils/firebase";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { QUERY_KEY } from "@/constants/queryKey";

interface LectureInfoType {
  userId: string;
  courseId: string;
  title: string;
  lectureType: string;
  lectureContent?: LectureContent;
  startDate: Timestamp;
  endDate: Timestamp;
  isPrivate: boolean;
}

const LectureInfo = async (data: LectureInfoType) => {
  const {
    title,
    lectureType,
    lectureContent,
    startDate,
    endDate,
    isPrivate,
    userId,
    courseId,
  } = data;

  try {
    const userRef = doc(db, "users", userId);
    const courseRef = doc(db, "courses", courseId);
    const lectureRef = collection(db, "lectures");

    const lectureDoc = {
      userId: userRef,
      courseId: courseRef,
      lectureType,
      title,
      lectureContent,
      startDate,
      endDate,
      isPrivate,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };
    await addDoc(lectureRef, lectureDoc);
    return lectureRef;
  } catch (error) {
    console.error("강의 추가 중 오류가 발생했습니다:", error);
  }
};

export const useCreateLecture = () => {
  const queryClient = useQueryClient();

  return useMutation(LectureInfo, {
    onSettled: () => {
      queryClient.invalidateQueries([QUERY_KEY.COURSE]);
    },
    onError: error => {
      console.error("강의 추가에 실패했습니다: ", error);
    },
  });
};
