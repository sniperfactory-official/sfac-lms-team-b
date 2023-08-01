"use client";

import React, { useState } from "react";
import AssignmentProfileImage from "./AssignmentProfileImage";
import AssignmentModal from "./AssignmentModal";
import AssignmentSubmitWithLink from "./AssignmentSubmitWithLink";
import AssignmentSubmitWithFile from "./AssignmentSubmitWithFile";
import AssignmentFeedback from "./AssignmentFeedback";
import { User } from "@/types/firebase.types";

interface OwnProps {
  user: User;
  assignmentId: string;
}

const AssignmentStudentViewCard: React.FC<OwnProps> = ({
  user,
  assignmentId,
}) => {
  const [isLinkOpen, setIsLinkOpen] = useState(false);
  const [isFileOpen, setIsFileOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  return (
    <>
      <div className="flex justify-between items-center px-[21px] py-[24px] border rounded-[10px]">
        <div className="flex justify-start items-center gap-[14px]">
          <AssignmentProfileImage />
          <div>
            <div className="mb-[5px]">
              <span className="mr-[15px] text-grayscale-100 text-[16px] font-[700]">
                김지은
              </span>
              <span className="text-grayscale-40 text-[14px] font-[400]">
                수강생
              </span>
            </div>
            <span className="py-[4px] px-[10px] text-[10px] font-[500] text-grayscale-60 rounded-[4px] bg-grayscale-5">
              제출 전
            </span>
          </div>
        </div>
        <div>
          {/* 제출 전 */}
          <div className="flex justify-end items-center gap-[14px]">
            <button
              type="button"
              className="border"
              onClick={() => {
                setIsFileOpen(true);
              }}
            >
              파일 첨부
            </button>
            <button
              type="button"
              className="border"
              onClick={() => {
                setIsLinkOpen(true);
              }}
            >
              링크
            </button>
          </div>
          {/* END 제출 전 */}

          {/* 제출 후 */}
          <div>
            <button
              type="button"
              className="border"
              onClick={() => {
                setIsDetailOpen(true);
              }}
            >
              확인하기
            </button>
          </div>
          {/* END 제출 후 */}
        </div>
      </div>
      {/* 과제: 링크 제출 */}
      <AssignmentModal
        title="과제 제출"
        isOpen={isLinkOpen}
        isBottomButton={true}
        onClose={() => {
          setIsLinkOpen(false);
        }}
      >
        <AssignmentSubmitWithLink
          assignmentId={assignmentId}
          onClose={() => {
            setIsLinkOpen(false);
          }}
        />
      </AssignmentModal>

      {/* 과제: 파일 제출 */}
      <AssignmentModal
        title="과제 제출"
        isOpen={isFileOpen}
        isBottomButton={true}
        onClose={() => {
          setIsFileOpen(false);
        }}
      >
        <AssignmentSubmitWithFile
          assignmentId={assignmentId}
          onClose={() => {
            setIsFileOpen(false);
          }}
        />
      </AssignmentModal>

      {/* 과제: 과제 상세 */}
      <AssignmentModal
        title="상세보기"
        isOpen={isDetailOpen}
        isBottomButton={false}
        onClose={() => {
          setIsDetailOpen(false);
        }}
      >
        <AssignmentFeedback />
      </AssignmentModal>
    </>
  );
};

export default AssignmentStudentViewCard;
