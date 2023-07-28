"use client";

import React, { FC, use } from "react";

import LectureHeader from "@/components/lectureRoom/LectureHeader";
import TypeOfLecture from "@/components/lectureRoom/typesOf/TypeOfLecture";
import LectureComment from "@/components/lectureRoom/LectureComment";
import LectureNavigation from "@/components/lectureRoom/LectureNavigation";
import useGetLectureInfo from "@/hooks/lecture/useGetLectureInfo";

interface lectureIdProps {
  lectureId: string;
}

const LectureHome: FC<lectureIdProps> = ({ lectureId }) => {
  lectureId = "lJWiLneoAspIqGZ2q48G";
  const { data, isLoading, error, isFetching } = useGetLectureInfo(lectureId);

  if (isFetching) {
    return <div className="w-full h-full">Loading...</div>;
  } else if (!isFetching && data !== undefined && data.user) {
    return (
      <main className="lectuerContainer flex flex-col w-full h-full">
        <LectureHeader
          title={data.title}
          startDate={data.startDate}
          endDate={data.endDate}
          user={data.user}
        />
        <div className="mainContainer flex w-full h-screen">
          <div className="Container flex flex-col w-3/4">
            <TypeOfLecture
              type={data.lectureType}
              content={data.lectureContent}
            />
            <LectureNavigation />
          </div>
          <LectureComment lectureId={lectureId} />
        </div>
      </main>
    );
  }
};

export default LectureHome;
