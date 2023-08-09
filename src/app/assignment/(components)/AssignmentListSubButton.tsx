"use client";

import "sfac-designkit-react/style.css";
import { Button } from "sfac-designkit-react";
import React, { useEffect, useState } from "react";
import { useGetSubmittedAssignments } from "@hooks/queries/useGetSubmittedAssignment";
import { useRouter } from "next/navigation";

interface Props {
  refId: string;
  userId: string;
}

const AssignmentListSubButton = ({ refId, userId }: Props) => {
  const submittionHooks = useGetSubmittedAssignments(refId, userId);
  const isLoading = submittionHooks.isLoading;
  const router = useRouter();
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      const issubmitted = submittionHooks.data !== undefined;
      setIsSubmitted(issubmitted);
    }
  }, [isLoading, submittionHooks.data]);

  return (
    <div>
      {isSubmitted ? (
        <Button
          variant="secondary"
          text="제출완료"
          onClick={() => {
            router.push(`/assignment/${refId}`);
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
            router.push(`/assignment/${refId}`);
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
