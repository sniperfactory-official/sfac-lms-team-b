"use client";

import React, { useState } from "react";
import AssignmentProfileImage from "./AssignmentProfileImage";
import AssignmentModal from "./AssignmentModal";
import AssignmentSubmitWithLink from "./AssignmentSubmitWithLink";
import AssignmentSubmitWithFile from "./AssignmentSubmitWithFile";
import AssignmentFeedback from "./AssignmentFeedback";
import { User, SubmittedAssignment } from "@/types/firebase.types";
import { Button } from "sfac-designkit-react";
import { Text } from "sfac-designkit-react";
import "sfac-designkit-react/style.css";

interface OwnProps {
  user: User;
  assignmentId: string;
  submittedAssignment?: SubmittedAssignment;
}

const AssignmentStudentViewCard: React.FC<OwnProps> = ({
  user,
  assignmentId,
  submittedAssignment,
}) => {
  const [isLinkOpen, setIsLinkOpen] = useState(false);
  const [isFileOpen, setIsFileOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  return (
    <>
      <div className="flex justify-between items-center px-[21px] py-[24px] border rounded-[10px]">
        <div className="flex justify-start items-center gap-[14px]">
          <AssignmentProfileImage profileImage={user.profileImage} />
          <div>
            <div className="mb-[5px] flex justify-start items-center gap-[6px]">
              <Text
                size="base"
                weight="bold"
                className="text-grayscale-100 text-color-Grayscale-100"
              >
                {user.username}
              </Text>
              <span className="w-[5px] h-[5px] bg-grayscale-20 rounded-full" />
              <Text
                size="base"
                weight="bold"
                className="text-color-Grayscale-40 text-grayscale-40"
              >
                {user.role}
              </Text>
            </div>
            <span className="py-[4px] px-[10px] text-[10px] font-[500] text-grayscale-60 rounded-[4px] bg-grayscale-5">
              {submittedAssignment ? "제출 완료" : "제출 전"}
            </span>
          </div>
        </div>
        <div>
          {/* 제출 전 */}
          {!submittedAssignment ? (
            <div className="flex justify-end items-center gap-[14px]">
              <Button
                variant="secondary"
                text="파일 첨부"
                textSize="sm"
                textWeight="semibold"
                asChild
                onClick={() => {
                  setIsFileOpen(true);
                }}
              />
              <Button
                variant="secondary"
                text="링크"
                textSize="sm"
                textWeight="semibold"
                asChild
                onClick={() => {
                  setIsLinkOpen(true);
                }}
              />
            </div>
          ) : null}
          {/* END 제출 전 */}

          {/* 제출 후 */}
          {submittedAssignment ? (
            <div>
              <Button
                variant="primary"
                text="확인하기"
                textSize="sm"
                asChild
                onClick={() => {
                  setIsDetailOpen(true);
                }}
              />
            </div>
          ) : null}

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
          userId={user.id}
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
          userId={user.id}
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
        {isDetailOpen ? (
          <AssignmentFeedback
            submittedAssignment={submittedAssignment}
            assignmentId={assignmentId}
            loginUser={user}
            setIsDetailOpen={setIsDetailOpen}
          />
        ) : null}
      </AssignmentModal>
    </>
  );
};

export default AssignmentStudentViewCard;
