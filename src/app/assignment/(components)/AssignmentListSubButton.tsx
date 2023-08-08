"use client";

import React, { useEffect, useState } from "react";
import { useGetSubmittedAssignments } from "@hooks/queries/useGetSubmittedAssignment";
import { useRouter } from "next/navigation";

interface Props {
  refId: string;
  userId: string;
}

//추후 userinfo도 넣어야함
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
        <button
          onClick={() => {
            router.push("/assignment/" + refId);
          }}
          type="button"
          className="w-[157px] h-[35px] p-[9px] gap-[10px] flex justify-center items-center flex-shrink-0 rounded-[10px] bg-zinc-100 font-bold text-zinc-500	border-none"
        >
          제출완료
        </button>
      ) : (
        <button
          onClick={() => {
            router.push("/assignment/" + refId);
          }}
          type="button"
          className="w-[157px] h-[35px] p-[9px] gap-[10px] flex justify-center items-center flex-shrink-0 rounded-[10px] bg-primary-80 font-bold text-slate-50 border-none"
        >
          제출하기
        </button>
      )}
    </div>
  );
};

export default AssignmentListSubButton;
