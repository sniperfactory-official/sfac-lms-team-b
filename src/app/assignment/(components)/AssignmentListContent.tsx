"use client";

import { Button, Text } from "sfac-designkit-react";
import { useRouter } from "next/navigation";
import { Assignment, User } from "@/types/firebase.types";
import { useGetAssignment } from "@hooks/queries/useGetAssignment";
import AssignmentListSubButton from "./AssignmentListSubButton";
import LoadingSpinner from "@/components/Loading/Loading";

interface IListContentProps {
  user: User;
}

const AssignmentListContent = ({ user }: IListContentProps) => {
  const { data: assignments, isLoading, error } = useGetAssignment();
  const router = useRouter();
  return (
    <>
      {isLoading ? (
        <LoadingSpinner fullScreen={true} />
      ) : (
        assignments?.map((assignment: Assignment) => {
          return (
            <div
              key={assignment.id}
              className="w-full px-[24px] py-[16px] flex-shrink-0 rounded-[10px] mb-[20px] border border-grayscale-5 flex justify-between items-center gap-[15px]"
            >
              <div className="flex flex-col items-start gap-[10px]">
                <span className="flex justify-center items-center py-[4px] px-[10px] rounded-[4px] bg-grayscale-5 text-[10px] text-grayscale-60">
                  {assignment.level}
                </span>
                <Text
                  size="base"
                  weight="bold"
                  className="text-grayscale-80 break-all"
                >
                  {assignment.title}
                </Text>
              </div>
              <div className="shrink-0">
                {user?.role === "관리자" ? (
                  <Button
                    variant="primary"
                    text="확인하기"
                    asChild
                    type="button"
                    onClick={() => {
                      router.push(`/assignment/${assignment.id}`);
                    }}
                  />
                ) : (
                  <AssignmentListSubButton
                    assignmentId={assignment.id}
                    userId={user.id}
                  />
                )}
              </div>
            </div>
          );
        })
      )}
    </>
  );
};

export default AssignmentListContent;
