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
  const { assignmentId } = useParams();

  const userId = useSelector((state: RootState) => {
    return state.userId;
  });

  const { data, isLoading, error } = useGetSubmittedAssignments(
    assignmentId as string,
    userId.uid,
  );

  // console.log("studentData", data);

  return (
    <div>
      <div>
        <AssignmentStudentViewCard
          user={user}
          userId={userId.uid}
          assignmentId={assignmentId as string}
          submittedAssignment={data}
        />
      </div>
    </div>
  );
};

export default AssignmentTeacherViewCardWrapper;
