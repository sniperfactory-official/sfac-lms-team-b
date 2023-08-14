"use client";

import { useParams } from "next/navigation";
import {
  ISubmittedAssignment,
  useGetSubmittedAssignments,
} from "@/hooks/queries/useGetSubmittedAssignment";
import { IUserProps } from "./AssignmentTeacherViewCardWrapper";
import AssignmentStudentViewCard from "./AssignmentStudentViewCard";
const AssignmentStudentViewCardWrapper = ({ user }: IUserProps) => {
  const { assignmentId } = useParams();

  const {
    data: submittedAssignment,
    isLoading,
    error,
  } = useGetSubmittedAssignments(assignmentId as string, user.id);

  return (
    <div>
      <div>
        <AssignmentStudentViewCard
          user={user}
          assignmentId={assignmentId as string}
          submittedAssignment={
            submittedAssignment as ISubmittedAssignment | null
          }
        />
      </div>
    </div>
  );
};

export default AssignmentStudentViewCardWrapper;
