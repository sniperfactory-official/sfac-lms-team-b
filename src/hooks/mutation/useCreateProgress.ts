import { useState } from "react";
import { Progress, playTime } from "@/types/firebase.types";
import { useMutation } from "@tanstack/react-query";
import { db } from "@/utils/firebase";
import {
  addDoc,
  collection,
  DocumentReference,
  doc,
  getDoc,
} from "firebase/firestore";

interface CreateProgressInput {
  userId: string;
  lectureId: string;
  lectureType: "노트" | "비디오" | "링크" | undefined;
  playTimes?: playTime[];
  onSuccess?: (progress: Progress) => void;
}

const createProgress = async (
  input: CreateProgressInput,
): Promise<Progress | null> => {
  const { userId, lectureId, lectureType } = input;

  // 강의 타입이 "비디오"가 아니면 생성하지 않고 null 반환
  if (lectureType !== "비디오") {
    return null;
  }

  try {
    const progressRef = collection(db, "progress");

    const progressDoc: {
      userId: DocumentReference;
      lectureId: DocumentReference;
      isCompleted: boolean;
      playTimes?: { start: string; end: string }[];
    } = {
      userId: doc(db, "users", userId),
      lectureId: doc(db, "lectures", lectureId),
      isCompleted: false, // 비디오 타입이므로 항상 false로 설정
      playTimes: [{ start: "", end: "" }],
    };

    const newProgressRef = await addDoc(progressRef, progressDoc);
    const newProgressSnapshot = await getDoc(newProgressRef);

    if (!newProgressSnapshot.exists()) {
      return null;
    }

    return {
      id: newProgressSnapshot.id,
      userId: progressDoc.userId,
      lectureId: progressDoc.lectureId,
      isCompleted: progressDoc.isCompleted,
      playTimes: progressDoc.playTimes || [],
    };
  } catch (error) {
    console.error("수강률 추가 중 오류가 발생했습니다:", error);
    throw error;
  }
};

const useCreateProgress = (
  onSuccessCallback?: (progress: Progress) => void,
) => {
  const [isMutationSuccessful, setIsMutationSuccessful] = useState(false);

  const createProgressMutation = useMutation<
    Progress | null,
    Error,
    CreateProgressInput
  >(createProgress, {
    onError: error => {
      console.error("수강률 추가에 실패했습니다: ", error);
    },
    onSuccess: data => {
      setIsMutationSuccessful(true);
      if (data && onSuccessCallback) {
        onSuccessCallback(data);
      }
    },
  });

  return { ...createProgressMutation, isMutationSuccessful };
};

export default useCreateProgress;
