"use client";

import React from "react";
import { useGetAssignment } from "@hooks/queries/useGetAssignment";
import { Assignment } from "@/types/firebase.types";
import AssignmentListSubButton from "./AssignmentListSubButton";
import { useRouter } from "next/navigation";
import { User } from "@/types/firebase.types";
import { Badge } from "sfac-designkit-react";
import {Button} from "sfac-designkit-react"

interface AssignmentNumberAdded extends Assignment {
  assignmentNumber: number;
}

type Props = {
  userInfo: User;
  userId: string;
};

const AssignmentListContent = (prop: Props) => {
  const assignmentData = useGetAssignment("");
  const router = useRouter();
  const userinfo = { ...prop.userInfo };
  let htmlContent;

  if (assignmentData.isLoading === false) {
    const assignmentInfo = assignmentData.data as AssignmentNumberAdded[];
    // map이 assignmentInfo의 property로 인식되어 경고문구가 뜸
    htmlContent = assignmentInfo?.map((assign: AssignmentNumberAdded) => (
      <div
        key={assign.id}
        className="w-full px-[24px] py-[16px] flex-shrink-0 rounded-[10px] mb-[20px] border border-grayscale-5 flex justify-between items-center"
      >
        <div className="flex w-[244px] flex-col items-start gap-[10px]">
          <Badge color="Outline">
            {assign.level}
          </Badge>
          <span className="text-grayscale-80 font-bold text-[16px]">
            {assign.title}
          </span>
        </div>
        {userinfo?.role === "관리자" ? (
          <Button
          variant="primary" 
          text="확인하기" 
            />
        ) : (
          <AssignmentListSubButton refId={assign.id} userId={prop.userId} />
        )}
      </div>
    ));
  }

  return <div>{htmlContent}</div>;
};

export default AssignmentListContent;
