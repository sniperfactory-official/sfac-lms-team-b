"use client";

import { FC } from "react";
import AssignmentStudentViewCard from "./AssignmentStudentViewCard";
import { User } from "@/types/firebase.types";
import { useParams } from "next/navigation";
import { useGetSubmittedAssignments } from "@/hooks/queries/useGetSubmittedAssignment";
import { useDeleteSubmittedAssignment } from "@/hooks/mutation/useDeleteSubmittedAssignment";

interface OwnProps {
  user: User;
}

const AssignmentTeacherViewCardWrapper: FC<OwnProps> = ({ user }) => {
  const { assignmentId } = useParams();

  const { data, isLoading, error } = useGetSubmittedAssignments(
    assignmentId as string,
    user.id,
  );

  // console.log("studentData", data);

  return (
    <div>
      <div>
        <AssignmentStudentViewCard
          user={user}
          assignmentId={assignmentId as string}
          submittedAssignment={data}
        />
      </div>
    </div>
  );
};

export default AssignmentTeacherViewCardWrapper;
