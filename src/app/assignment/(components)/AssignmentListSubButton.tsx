"use client";

import { Button } from "sfac-designkit-react";
import { useGetSubmittedAssignments } from "@hooks/queries/useGetSubmittedAssignment";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/components/Loading/Loading";

interface IListSubButtonProps {
  assignmentId: string;
  userId: string;
}

const AssignmentListSubButton = ({
  assignmentId,
  userId,
}: IListSubButtonProps) => {
  const router = useRouter();
  const {
    data: submittedAssignment,
    isLoading,
    error,
  } = useGetSubmittedAssignments(assignmentId, userId);

  return (
    <div>
      {isLoading ? (
        <LoadingSpinner />
      ) : submittedAssignment ? (
        <Button
          variant="secondary"
          text="제출완료"
          onClick={() => {
            router.push(`/assignment/${assignmentId}`);
          }}
          type="button"
          asChild
          className="flex-shrink-0"
        />
      ) : (
        <Button
          variant="primary"
          text="제출하기"
          onClick={() => {
            router.push(`/assignment/${assignmentId}`);
          }}
          type="button"
          asChild
          className="flex-shrink-0"
        />
      )}
    </div>
  );
};

export default AssignmentListSubButton;
