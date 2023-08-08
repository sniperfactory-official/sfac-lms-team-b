import React, { FC, useEffect } from "react";
import { Lecture } from "@/types/firebase.types";
import useGetProgressInfo from "@/hooks/queries/useGetProgressInfo";
import useCreateProgress from "@/hooks/mutation/useCreateProgress";
import useUser from "@/hooks/user/useUser";

import LectureContent from "./LectureContent";
import LoadingSpinner from "@/components/Loading/Loading";

interface TypeOfLectureProps {
  lectureData: Lecture | undefined;
}

const TypeOfLecture: FC<TypeOfLectureProps> = ({ lectureData }) => {
  const { user } = useUser();
  const userId = user?.uid || "";
  const lectureId = lectureData?.id || "";
  const { data: progressData, isLoading: isLoadingProgress } =
    useGetProgressInfo(userId, lectureId);
  const { mutate, isMutationSuccessful } = useCreateProgress();

  const progressInfo = progressData?.data;
  const hasData = progressData?.hasData || false;

  useEffect(() => {
    if (
      !userId ||
      !lectureId ||
      isLoadingProgress ||
      hasData ||
      isMutationSuccessful
    )
      return;

    mutate({
      userId,
      lectureId,
      lectureType: lectureData?.lectureType,
    });
  }, [
    progressData,
    lectureData,
    userId,
    isLoadingProgress,
    lectureId,
    isMutationSuccessful,
  ]);

  if (
    !lectureData ||
    lectureData.lectureContent === undefined ||
    isLoadingProgress
  ) {
    return (
      <div className="w-screen flex justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  const { lectureType: type, lectureContent: content } = lectureData;

  return (
    <LectureContent type={type} content={content} progressInfo={progressInfo} />
  );
};

export default TypeOfLecture;
