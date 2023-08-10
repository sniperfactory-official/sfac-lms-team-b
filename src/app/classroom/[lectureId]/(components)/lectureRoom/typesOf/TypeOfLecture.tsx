import React, { FC, useEffect, useState } from "react";
import { Lecture, Progress } from "@/types/firebase.types";
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
  const [progressInfo, setProgressInfo] = useState<Progress | null | undefined>(
    undefined,
  );

  const { mutate, isMutationSuccessful } = useCreateProgress(progress => {
    setProgressInfo(progress);
  });

  const hasData = progressData?.hasData || false;

  useEffect(() => {
    if (!userId || !lectureId || isLoadingProgress || isMutationSuccessful)
      return;

    if (hasData) {
      setProgressInfo(progressData?.data);
    } else {
      mutate({
        userId,
        lectureId,
        lectureType: lectureData?.lectureType,
      });
    }
  }, [progressData, lectureData, userId, isLoadingProgress, lectureId]);

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
