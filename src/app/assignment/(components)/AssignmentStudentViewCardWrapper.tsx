"use client";

import { FC } from "react";
import AssignmentStudentViewCard from "./AssignmentStudentViewCard";
import { User, SubmittedAssignment } from "@/types/firebase.types";
import { useParams } from "next/navigation";
import { useGetSubmittedAssignments } from "@/hooks/queries/useGetSubmittedAssignment";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

interface OwnProps {
  user: User;
}

const AssignmentTeacherViewCardWrapper: FC<OwnProps> = ({ user }) => {
  const userId = useSelector((state: RootState) => {
    return state.userId;
  });

  const { assignmentId } = useParams();
  const { data, isLoading, error } = useGetSubmittedAssignments(
    assignmentId as string,
    userId.uid as string,
  );

  // console.log("studentData", data);

  return (
    <div>
      <div>
        <AssignmentStudentViewCard
          user={user}
          assignmentId={assignmentId as string}
          submittedAssignment={data as SubmittedAssignment}
        />
      </div>
    </div>
  );
};

export default AssignmentTeacherViewCardWrapper;
