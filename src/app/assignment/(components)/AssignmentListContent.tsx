"use client";

import "sfac-designkit-react/style.css";
import { Button, Text } from "sfac-designkit-react";
import React from "react";
import { useRouter } from "next/navigation";
import { Assignment } from "@/types/firebase.types";
import { useGetAssignment } from "@hooks/queries/useGetAssignment";
import { User } from "@/types/firebase.types";
import AssignmentListSubButton from "./AssignmentListSubButton";

type Props = {
  userInfo: User;
  userId: string;
};

const AssignmentListContent = (props: Props) => {
  const assignmentData = useGetAssignment("");
  const router = useRouter();
  const userinfo = { ...props.userInfo };
  let htmlContent;

  if (assignmentData.isLoading === false) {
    const assignmentInfo = assignmentData.data as Assignment[];
    htmlContent = assignmentInfo?.map((assign: Assignment) => (
      <div
        key={assign.id}
        className="w-full px-[24px] py-[16px] flex-shrink-0 rounded-[10px] mb-[20px] border border-grayscale-5 flex justify-between items-center gap-[15px]"
      >
        <div className="flex flex-col items-start gap-[10px]">
          <span className="flex justify-center items-center py-[4px] px-[10px] rounded-[4px] bg-grayscale-5 text-[10px] text-grayscale-60">
            {assign.level}
          </span>
          <Text
            size="base"
            weight="bold"
            className="text-grayscale-80 break-all"
          >
            {assign.title}
          </Text>
        </div>
        <div className="shrink-0">
          {userinfo?.role === "관리자" ? (
            <Button
              variant="primary"
              text="확인하기"
              asChild
              type="button"
              onClick={() => {
                router.push(`/assignment/${assign.id}`);
              }}
            />
          ) : (
            <AssignmentListSubButton refId={assign.id} userId={props.userId} />
          )}
        </div>
      </div>
    ));
  }

  return <div>{htmlContent}</div>;
};

export default AssignmentListContent;
