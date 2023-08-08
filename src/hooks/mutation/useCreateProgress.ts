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
}

const createProgress = async (
  input: CreateProgressInput,
): Promise<Progress | null> => {
  const { userId, lectureId, lectureType } = input;

  try {
    const progressRef = collection(db, "progress");

    let progressDoc: {
      userId: DocumentReference;
      lectureId: DocumentReference;
      isCompleted: boolean;
      playTimes?: [];
    } = {
      userId: doc(db, "users", userId),
      lectureId: doc(db, "lectures", lectureId),
      isCompleted: lectureType === "노트",
    };

    if (lectureType === "비디오") {
      progressDoc.playTimes = [];
    }

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

const useCreateProgress = () => {
  const [isMutationSuccessful, setIsMutationSuccessful] = useState(false);

  const createProgressMutation = useMutation<
    Progress | null,
    Error,
    CreateProgressInput
  >(createProgress, {
    onError: error => {
      console.error("수강률 추가에 실패했습니다: ", error);
    },
    onSuccess: () => {
      setIsMutationSuccessful(true);
    },
  });

  return { ...createProgressMutation, isMutationSuccessful };
};

export default useCreateProgress;
