"use client";

import React from "react";
import { useGetAssignment } from '@hooks/queries/useGetAssignment';
import { Assignment } from "@/types/firebase.types";
import Link from "next/link";

interface AssignmentNumberAdded extends Assignment{
  assignmentNumber: number;
}

const USER_INFO = {
  id: 1,
  role: "관리자", // 관리자, 수강생
  username: "김지은",
};

const ListContent = ()=>{
  const assignmentData = useGetAssignment("");
  let htmlContent ;

  if (assignmentData.isLoading === false){
    const assignmentInfo = assignmentData.data;
    htmlContent = assignmentInfo?.map((assign: AssignmentNumberAdded)=>(
      <div
        key={assign.assignmentNumber}
        className="w-[775px] h-[87px] flex-shrink-0 border-radius-[10px] mb-[20px] border border-grayscale-5 bg-grayscale-0 flex justify-between items-center px-[24px]">
        <div className="flex w-[244px] flex-col items-start gap-[10px]">
          <div className="inline-flex p-[4px] px-[10px] justify-center items-center gap-[8px] rounded-[4px] bg-grayscale-5">
            {assign.level}
          </div>
          <div className="text-grayscale-80 font-bold text-[16px]">
            {assign.title}
          </div>
        </div>
        { USER_INFO.role === "관리자" ? (
            <Link
              href={"/assignment/detail/"+assign.assignmentNumber}
              className="w-[157px] h-[35px] p-[9px] gap-[10px] flex justify-center items-center flex-shrink-0 rounded-[10px] bg-primary-80 border-none">
              확인하기
            </Link>
          ):(
            <Link
            href={"/assignment/detail/"+assign.assignmentNumber}
            className="w-[157px] h-[35px] p-[9px] gap-[10px] flex justify-center items-center flex-shrink-0 rounded-[10px] bg-primary-80 border-none">
              제출하기
            </Link>
          ) }
      </div>
    ));}

  return <div>{htmlContent}</div>;
};

export default ListContent;
