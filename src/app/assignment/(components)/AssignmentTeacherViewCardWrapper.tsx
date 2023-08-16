"use client";

import { useParams } from "next/navigation";
import { useGetSubmittedAssignments } from "@/hooks/queries/useGetSubmittedAssignment";
import { User } from "@/types/firebase.types";
import { ISubmittedAssignment } from "@/hooks/queries/useGetSubmittedAssignment";
import EmptyContents from "@/components/EmptyContents";
import AssignmentTeacherViewCard from "../(components)/AssignmentTeacherViewCard";

export interface IUserProps {
  user: User;
}

const AssignmentTeacherViewCardWrapper = ({ user }: IUserProps) => {
  const { assignmentId } = useParams();
  const {
    data: submittedAssignments,
    isLoading,
    error,
  } = useGetSubmittedAssignments(assignmentId as string);

  return (
    <div>
      {isLoading ? null : (
        <div>
          {Array.isArray(submittedAssignments) ? (
            submittedAssignments?.map(
              (submittedAssignment: ISubmittedAssignment) => {
                return (
                  <AssignmentTeacherViewCard
                    key={submittedAssignment.id}
                    submittedAssignment={submittedAssignment}
                    assignmentId={assignmentId as string}
                    user={user}
                  />
                );
              },
            )
          ) : (
            <EmptyContents emptyTxt="제출된 과제가 없습니다" />
          )}
        </div>
      )}
    </div>
  );
};

export default AssignmentTeacherViewCardWrapper;
