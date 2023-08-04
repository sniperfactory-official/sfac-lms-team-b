"use client";

import React from "react";
import Link from "next/link";
import { useGetSubmittedAssignments } from "@hooks/queries/useGetSubmittedAssignment";
import { useRouter } from "next/navigation";
import { User } from "@/types/firebase.types";


interface Props {
  targetId: string;
  userInfo : User;
}

//추후 userinfo도 넣어야함
const AssignmentListSubButton = ({targetId, userInfo}: Props) => {
  const submittionHooks = useGetSubmittedAssignments(targetId);
  const router = useRouter();
  let isSubmitted;

  if (!submittionHooks.isLoading) {
    isSubmitted = submittionHooks.data?.length > 0;
  }

  return (
    <div>
      {isSubmitted ? (
        <button
          onClick={() => {
            router.push("/assignment/" + targetId);
          }}
          type="button"
          className="w-[157px] h-[35px] p-[9px] gap-[10px] flex justify-center items-center flex-shrink-0 rounded-[10px] bg-zinc-100 font-bold text-zinc-500	border-none"
        >
          제출완료
        </button>
      ) : (
        <button
          onClick={() => {
            router.push("/assignment/" + targetId);
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
