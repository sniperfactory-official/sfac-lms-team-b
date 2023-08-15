"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useGetAssignment } from "@/hooks/queries/useGetAssignment";
import { useDeleteRegisteredAssignment } from "@/hooks/mutation/useDeleteRegisteredAssignment";
import { useParams } from "next/navigation";
import LoadingSpinner from "@/components/Loading/Loading";
import { User } from "@/types/firebase.types";
import { Assignment } from "@/types/firebase.types";
import Image from "next/image";
import { Avatar, Text } from "sfac-designkit-react";

import AssignmentGlobalConfirmDialog from "./AssignmentGlobalConfirmDialog";
import AssignmentModal from "./AssignmentModal";
import AssignmentUpdate from "./AssignmentUpdate";
import timestampToIntlDate from "@/utils/timestampToIntlDate";
import { useUpdateReadStudents } from "@/hooks/mutation/useUpdateReadStudents";
import useGetStudents from "@/hooks/queries/useGetStudents";

interface IUserProps {
  user: User;
}

const AssignmentDetailContent = ({ user }: IUserProps) => {
  const router = useRouter();

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { assignmentId } = useParams();
  const { data, isLoading, error } = useGetAssignment(assignmentId as string);
  const updateReadStudents = useUpdateReadStudents(assignmentId as string);
  const [totalStudentList, setTotalStudentList] = useState<User[]>([]);
  const [readPercentage, setReadPercentage] = useState<number>();
  const currentReadStudents = data?.readStudents;

  const fetchStudentsData = async () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const studentData = await useGetStudents();
    setTotalStudentList(studentData);
  };

  useEffect(() => {
    fetchStudentsData();

    if (user.role === "수강생" && currentReadStudents) {
      if (!currentReadStudents?.includes(user.id)) {
        changeReadStudents();
      }
    }

    if (totalStudentList && currentReadStudents) {
      const percentage = calculateReadPercentage();
      setReadPercentage(percentage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, currentReadStudents]);

  const changeReadStudents = () => {
    // fs readStudent 업데이트
    if (currentReadStudents) {
      const updatedReadStudents = Array.from(
        new Set([...currentReadStudents, user.id]),
      );
      updateReadStudents.mutate(updatedReadStudents);
    }
  };

  const calculateReadPercentage = () => {
    const totalStudentCount = totalStudentList.length;
    const currentReadStudentsCount = currentReadStudents.length;
    const percentage = (currentReadStudentsCount / totalStudentCount) * 100;
    const roundedPercentage = Math.round(percentage); // 소수점 반올림
    return roundedPercentage;
  };

  const deleteAssignmentMutation = useDeleteRegisteredAssignment(
    assignmentId as string,
    data?.images,
  );

  // 데이터가 배열인지 아닌지에 따라 처리 -> 타입스크립트 오류수정
  if (isLoading) return <LoadingSpinner />;
  if (!data) {
    return null;
  }
  const assignment: Assignment = Array.isArray(data) ? data[0] : data;

  return (
    <div>
      {data ? (
        <div className="px-[20px] py-[29px]">
          <div className="flex justify-between items-start">
            <div className="flex justify-start items-center gap-[16px] mb-[31px]">
              <Avatar
                src={assignment.user?.profileImage}
                ringColor="ring-grayscale-10"
                className="ring-1"
              />
              <div>
                <div className="flex justify-start items-center gap-[9px]">
                  <Text
                    size="base"
                    weight="bold"
                    className="text-color-Grayscale-100 text-grayscale-100"
                  >
                    {assignment.user?.username}
                  </Text>
                  {/* 강사만 확인 가능한 영역 */}
                  {user?.role === "관리자" ? (
                    <span className="border border-primary-90 rounded-[4px] text-primary-100 font-[500] text-[10px] px-[3.5px] py-[1px]">
                      {readPercentage}% 읽음
                    </span>
                  ) : null}

                  {/* END 강사만 확인 가능한 영역 */}
                </div>
                <div className="flex justify-start items-center gap-[7px]">
                  <Text
                    size="base"
                    weight="medium"
                    className="text-color-Grayscale-40 text-grayscale-40"
                  >
                    {assignment.user?.role}
                  </Text>
                  <span className="w-[5px] h-[5px] bg-grayscale-20 rounded-full"></span>
                  <Text
                    size="sm"
                    weight="semibold"
                    className="text-color-Grayscale-40 text-grayscale-40"
                  >
                    {assignment.createdAt
                      ? timestampToIntlDate(assignment.createdAt, "/")
                      : null}
                  </Text>
                </div>
              </div>
            </div>
            {/* 강사만 확인 가능 영역 */}
            {user?.role === "관리자" ? (
              <div className="flex justify-end items-center pt-1">
                <button
                  type="button"
                  className="text-grayscale-100 text-[12px] font-[400] after:content-['|'] after:text-grayscale-30 after:ml-[6px] after:mr-[6px]"
                  onClick={() => {
                    setIsOpen(true);
                  }}
                >
                  수정
                </button>
                <AssignmentModal
                  title="과제 수정하기"
                  isOpen={isOpen}
                  isBottomButton={true}
                  onClose={() => {
                    setIsOpen(false);
                  }}
                >
                  <AssignmentUpdate
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    assignmentId={assignmentId as string}
                  />
                </AssignmentModal>
                <button
                  className="text-grayscale-100 text-[12px] font-[400]"
                  type="button"
                  onClick={() => {
                    setIsConfirmOpen(true);
                  }}
                >
                  삭제
                </button>
              </div>
            ) : null}
            {/* END 강사만 확인 가능 영역 */}
          </div>
          <div className="pb-[35px] border-b">
            <p className="inline-block rounded-[4px] bg-grayscale-5 text-grayscale-60 font-[400] text-[10px] mb-[8px] p-[4px_10px]">
              {assignment.level}
            </p>
            <Text
              size="lg"
              weight="bold"
              className="block text-color-Grayscale-80 text-grayscale-80 mb-[10px] break-all"
            >
              {assignment.title}
            </Text>
            <Text
              size="sm"
              weight="medium"
              className="block text-color-Grayscale-60 text-grayscale-60 mb-[16px] whitespace-pre-line break-all"
            >
              {assignment.content}
            </Text>
            <div className="flex justify-end items-center pt-[5px] gap-[7px]">
              <Text
                size="sm"
                weight="medium"
                className="text-color-Grayscale-60 text-grayscale-60"
              >
                마감일
              </Text>
              <span className="w-[5px] h-[5px] bg-grayscale-20 rounded-full" />
              <Text
                size="sm"
                weight="semibold"
                className="text-color-Grayscale-40 text-grayscale-40"
              >
                {assignment.endDate
                  ? timestampToIntlDate(assignment.endDate, "/")
                  : null}
              </Text>
            </div>
            {assignment.images.length > 0 ? (
              <div className="pt-[34px]">
                {assignment.images.map((image, index) => {
                  return (
                    <div key={index} className="w-full mb-[10px]">
                      <Image
                        src={image}
                        alt={`과제상세이미지${index}`}
                        width="0"
                        height="0"
                        sizes="100vw"
                        style={{ width: "auto", height: "auto" }}
                      />
                    </div>
                  );
                })}
              </div>
            ) : null}
          </div>
        </div>
      ) : null}

      {/* 글로벌 컨펌 모달  */}
      <AssignmentGlobalConfirmDialog
        title="강의를 삭제하시겠습니까?"
        confirmBtnMsg="삭제"
        onConfirm={() => {
          deleteAssignmentMutation.mutate();
          setIsConfirmOpen(false);
          router.push("/assignment");
        }}
        isOpen={isConfirmOpen}
        onCancel={() => {
          setIsConfirmOpen(false);
        }}
      />
    </div>
  );
};

export default AssignmentDetailContent;
