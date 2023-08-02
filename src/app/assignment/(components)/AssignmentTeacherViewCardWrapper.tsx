"use client";

import React from "react";
import EmptyContents from "@/components/EmptyContents";
import AssignmentTeacherViewCard from "../(components)/AssignmentTeacherViewCard";
import { User } from "@/types/firebase.types";
import { useParams } from "next/navigation";
import { useGetSubmittedAssignments } from "@/hooks/queries/useGetSubmittedAssignment";

interface OwnProps {
  user: User;
}

const AssignmentTeacherViewCardWrapper: React.FC<OwnProps> = ({ user }) => {
  // const { assignmentId } = useParams(); // FIXME: 제출과제 왜 안 담기지
  // console.log("assignmentId", assignmentId);
  // if (assignmentId) {
  //   const { data, isLoading, error } = useGetSubmittedAssignments(assignmentId);
  //   console.log("data", data);
  // }

  return (
    <div>
      <div>
        {/* 제출된 과제 존재 유무에 따른 분기처리 필요 */}
        <EmptyContents emptyTxt="제출된 과제가 없습니다" />
        <AssignmentTeacherViewCard user={user} />
      </div>
    </div>
  );
};

export default AssignmentTeacherViewCardWrapper;
