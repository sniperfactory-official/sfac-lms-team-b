"use client";

import React from "react";

import LectureHeader from "@/app/classroom/[lectureId]/(components)/lectureRoom/LectureHeader";
import TypeOfLecture from "@/app/classroom/[lectureId]/(components)/lectureRoom/typesOf/TypeOfLecture";
import LectureComment from "@/app/classroom/[lectureId]/(components)/lectureRoom/LectureComment";
import LectureNavigation from "@/app/classroom/[lectureId]/(components)/lectureRoom/LectureNavigation";

const LectureHome = ({ params }: { params: { lectureId: string } }) => {
  const { lectureId } = params;
  return (
    <main className="lectuerContainer flex flex-col w-full h-full">
      <LectureHeader lectureId={lectureId} />
      <div className="mainContainer flex w-full h-screen">
        <div className="Container flex flex-col w-3/4 h-full">
          <TypeOfLecture lectureId={lectureId} />
          <LectureNavigation lectureId={lectureId} />
        </div>
        <LectureComment lectureId={lectureId} />
      </div>
    </main>
  );
};

export default LectureHome;
