"use client";

import React, { FC } from "react";

import LectureHeader from "@/components/lecture/LectureHeader";
import TypeOfLecture from "@/components/lecture/typesOf/TypeOfLecture";
import LectureComment from "@/components/lecture/LectureComment";
import LectureFooter from "@/components/lecture/LectureNavigation";
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
        <LectureHeader />
        <div className="mainContainer flex w-full h-screen">
          <div className="Container flex flex-col w-3/4">
            <TypeOfLecture type={data.lectureType} content={data.lectureContent} />
            <LectureFooter />
          </div>
          <LectureComment />
        </div>
      </main>
    );
  }
};

export default LectureHome;
