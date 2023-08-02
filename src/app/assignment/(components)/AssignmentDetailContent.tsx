"use client";

import React, { useState } from "react";
import AssignmentProfileImage from "../(components)/AssignmentProfileImage";
import { useGetAssignment } from "@/hooks/queries/useGetAssignment";
import { useParams } from "next/navigation";
import Image from "next/image";
import timestampToDate from "@/utils/timestampToDate";
import LoadingSpinner from "@/components/Loading/Loading";
import { User } from "@/types/firebase.types";
import AssignmentConfirmDialog from "./AssignmentConfirmDialog";
import AssignmentModal from "./AssignmentModal";
import AssignmentUpdate from "./AssignmentUpdate";

interface OwnProps {
  user: User;
}

const AssignmentDetailContent: React.FC<OwnProps> = ({ user }) => {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { assignmentId } = useParams();
  const { data, isLoading, error } = useGetAssignment(assignmentId as string); // FIXME: hook undefined 문제인가 체크 필요

  // const blob = data?.images; // FIXME: blob 이미지 호출 체크
  // console.log(blob);

  // if (blob) {
  //   const url = URL.createObjectURL(blob);
  //   console.log(url);
  // }

  if (isLoading) return <LoadingSpinner />;

  return (
    <div>
      {data ? (
        <div className="px-[20px] py-[29px]">
          <div className="flex justify-between items-start">
            <div className="flex justify-start items-center gap-[16px] mb-[31px]">
              <AssignmentProfileImage data={data} />
              <div>
                <div className="flex justify-start items-center gap-[9px]">
                  <p className="text-[16px] font-[700] text-grayscale-100">
                    {data.user.username}
                  </p>
                  {/* FIXME: 강사만 확인 가능한 영역 */}
                  {user.role === "관리자" ? (
                    <span className="border border-primary-90 rounded-[4px] text-primary-100 font-[500] text-[10px] px-[3.5px] py-[1px]">
                      63% 읽음
                    </span>
                  ) : null}

                  {/* END 강사만 확인 가능한 영역 */}
                </div>
                <span className="mr-[15px] text-grayscale-40 text-[16px] font-[400]">
                  {data.user.role}
                </span>
                <span className="text-grayscale-40 text-[14px] font-[500]">
                  {timestampToDate(data.createdAt)}
                </span>
              </div>
            </div>
            {/* FIXME: 강사만 확인 가능 영역 */}
            {user.role === "관리자" ? (
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
                  isBottomButton={false}
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
              {data.level}
            </p>
            <h3 className="text-grayscale-80 text-[18px] font-[700] mb-[7px]">
              {data.title}
            </h3>
            <p className="text-grayscale-60 text-[14px] font-[400]">
              {data.content}
            </p>
            {/* {data?.images.map((image, index) => {
            return (
              <Image
                key={index}
                src={URL.createObjectURL(image)}
                alt={"이미지추가"}
                width={61}
                height={61}
              />
            );
          })} */}
            <div className="flex justify-end items-center pt-[5px] gap-[7px]">
              <span className="text-grayscale-60 text-[14px] font-[500]">
                마감일
              </span>
              <span className="w-[5px] h-[5px] bg-grayscale-20 rounded-full"></span>
              <span className="text-grayscale-40 text-[14px] font-[500]">
                {timestampToDate(data.endDate)}
              </span>
            </div>
          </div>
        </div>
      ) : null}

      {/* 글로벌 컨펌 모달  */}
      <AssignmentConfirmDialog
        isGlobal={true}
        title="강의를 삭제하시겠습니까?"
        confirmBtnMsg="삭제"
        onConfirm={() => {
          setIsConfirmOpen(false);
        }}
        isOpen={isConfirmOpen}
        onCancel={() => {
          setIsConfirmOpen(false);
        }}
      />

      {/* 모달 내 컨펌 모달 예시 */}
      {/* <AssignmentConfirmDialog
        isGlobal={false}
        title="삭제하시겠습니까?"
        desc="한번 삭제하시면 다시 복구가 불가능합니다."
        confirmBtnMsg="확인"
        onConfirm={() => {
          setIsConfirmOpen(false);
        }}
        isOpen={isConfirmOpen}
        onCancel={() => {
          setIsConfirmOpen(false);
        }}
      /> */}
    </div>
  );
};

export default AssignmentDetailContent;
