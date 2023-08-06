"use client";

import React from "react";
import useGetLectureInfo from "@/hooks/queries/useGetLectureInfo";

import LectureHeader from "@/app/classroom/[lectureId]/(components)/lectureRoom/LectureHeader";
import TypeOfLecture from "@/app/classroom/[lectureId]/(components)/lectureRoom/typesOf/TypeOfLecture";
import LectureComment from "@/app/classroom/[lectureId]/(components)/lectureRoom/LectureComment";
import LectureNavigation from "@/app/classroom/[lectureId]/(components)/lectureRoom/LectureNavigation";

const LectureHome = ({ params }: { params: { lectureId: string } }) => {
  const { lectureId } = params;
  const { data: lectureData, isFetching } = useGetLectureInfo(lectureId);

  if (isFetching) {
    return <div>Loading...</div>;
  }

  return (
    <main className="lectuerContainer flex flex-col w-full h-full">
      <LectureHeader lectureData={lectureData} />
      <div className="mainContainer flex w-full h-screen">
        <div className="Container w-3/4 flex flex-col h-screen">
          <TypeOfLecture lectureData={lectureData} />
          <LectureNavigation lectureId={lectureId} />
        </div>
        <LectureComment lectureId={lectureId} />
      </div>
    </main>
  );
};

export default LectureHome;
