"use client";

import React from "react";
import useGetLectureInfo from "@/hooks/queries/useGetLectureInfo";
import { LectureCommentProvider } from "../(components)/contexts/LectureCommentProvider";
import LectureHeader from "@/app/classroom/[lectureId]/(components)/lectureRoom/LectureHeader";
import TypeOfLecture from "@/app/classroom/[lectureId]/(components)/lectureRoom/typesOf/TypeOfLecture";
import LectureComment from "@/app/classroom/[lectureId]/(components)/lectureRoom/LectureComment";
import LectureNavigation from "@/app/classroom/[lectureId]/(components)/lectureRoom/LectureNavigation";
import LoadingSpinner from "@/components/Loading/Loading";

const LectureHome = ({ params }: { params: { lectureId: string } }) => {
  const { lectureId } = params;
  const { data: lectureData, isFetching } = useGetLectureInfo(lectureId);

  if (isFetching) {
    return <div className="w-screen flex justify-center">
    <LoadingSpinner />
  </div>
  }

  return (
    <LectureCommentProvider>
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
    </LectureCommentProvider>
  );
};

export default LectureHome;
