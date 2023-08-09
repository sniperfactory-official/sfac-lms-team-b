import { LectureContent } from "@/types/firebase.types";
import { db } from "@/utils/firebase";
import { doc, serverTimestamp, Timestamp, updateDoc } from "firebase/firestore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "@/constants/queryKey";

interface LectureInfoType {
  lectureId: string;
  title: string;
  externalLink: string;
  noteImages?: string[];
  textContent: string;
  videoURL: string;
  videoLength: number;
  lectureContent: LectureContent;
  startDate: Timestamp;
  endDate: Timestamp;
  isPrivate: boolean;
}

const LectureInfo = async (data: LectureInfoType) => {
  const {
    lectureId,
    title,
    externalLink,
    noteImages,
    textContent,
    videoURL,
    videoLength,
    startDate,
    endDate,
    isPrivate,
  } = data;

  try {
    const lectureRef = doc(db, "lectures", lectureId);
    const lectureDoc = {
      title,
      "lectureContent.externalLink": externalLink,
      // "lectureContent.images": noteImages,
      "lectureContent.textContent": textContent,
      "lectureContent.videoUrl": videoURL,
      "lectureContent.videoLength": videoLength,
      startDate,
      endDate,
      isPrivate,
      updatedAt: serverTimestamp(),
    };
    await updateDoc(lectureRef, lectureDoc);
  } catch (error) {
    console.error("강의 수정 중 오류가 발생했습니다:", error);
  }
};

export const useUpdateLecture = () => {
  const queryClient = useQueryClient();

  return useMutation(LectureInfo, {
    onSuccess: data => {
      console.log(data);
      queryClient.invalidateQueries([QUERY_KEY.COURSE]);
    },
    onError: error => {
      console.error("강의 수정에 실패했습니다: ", error);
    },
  });
};
