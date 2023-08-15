"use client";
import { useState } from "react";
import { User } from "@/types/firebase.types";
import { ISubmittedAssignment } from "@/hooks/queries/useGetSubmittedAssignment";
import { Avatar, Text } from "sfac-designkit-react";
import AssignmentModal from "./AssignmentModal";
import AssignmentFeedback from "./AssignmentFeedback";
import Image from "next/image";
import timestampToIntlDate from "@/utils/timestampToIntlDate";

interface IAssignmentTeacherViewCardProps {
  submittedAssignment: ISubmittedAssignment;
  assignmentId: string;
  user: User;
}

const AssignmentTeacherViewCard = ({
  submittedAssignment,
  assignmentId,
  user: loginUser,
}: IAssignmentTeacherViewCardProps) => {
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const {
    user: { profileImage, username, role },
    attachment: { attachmentFiles, links },
  } = submittedAssignment;

  return (
    <>
      {submittedAssignment ? (
        <div
          className="flex justify-between items-stretch px-[21px] py-[24px] border rounded-[10px] gap-[5px] mb-[15px]"
          onClick={() => {
            setIsDetailOpen(true);
          }}
        >
          <div
            className="flex justify-start items-start gap-[14px]"
            style={{ width: "calc(100% - 137px)" }}
          >
            <Avatar
              src={profileImage}
              ringColor="ring-grayscale-10"
              className="ring-1"
            />
            <div className="w-full">
              <div className="w-full mb-[5px] flex justify-start items-center gap-[6px]">
                <Text
                  size="base"
                  weight="bold"
                  className="text-grayscale-100 text-color-Grayscale-100"
                >
                  {username}
                </Text>
                <span className="w-[5px] h-[5px] bg-grayscale-20 rounded-full" />
                <Text
                  size="base"
                  weight="medium"
                  className="text-grayscale-40 text-color-Grayscale-40"
                >
                  {role}
                </Text>
              </div>
              {attachmentFiles &&
                attachmentFiles.map(file => {
                  return (
                    <Text
                      key={file.name}
                      size="sm"
                      weight="medium"
                      className="text-grayscale-40 text-color-Grayscale-40 line-clamp-1"
                    >
                      {file.name}
                    </Text>
                  );
                })}
              {links &&
                links.map(link => {
                  return (
                    <Text
                      key={link}
                      size="sm"
                      weight="medium"
                      className="text-grayscale-40 text-color-Grayscale-40 line-clamp-1"
                    >
                      {link}
                    </Text>
                  );
                })}
            </div>
          </div>
          <div className="flex basis-[80px] shrink-0 flex-col justify-between items-end">
            <div className="w-[19px] h-[19px]">
              {!submittedAssignment.isRead ? (
                <div className="w-full h-full">
                  <Image
                    src="/images/icon_new.svg"
                    alt="assignment"
                    width="0"
                    height="0"
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : null}
            </div>
            <Text
              size="sm"
              weight="medium"
              className="text-grayscale-40 text-color-Grayscale-40 mt-[5px]"
            >
              {submittedAssignment.createdAt
                ? timestampToIntlDate(submittedAssignment.createdAt, "/")
                : null}
            </Text>
          </div>
        </div>
      ) : null}

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
            loginUser={loginUser}
            assignmentId={assignmentId}
          />
        ) : null}
      </AssignmentModal>
    </>
  );
};

export default AssignmentTeacherViewCard;
