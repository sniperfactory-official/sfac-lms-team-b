"use client";
import { useState } from "react";
import { User, Attachment, SubmittedAssignment } from "@/types/firebase.types";
import AssignmentModal from "./AssignmentModal";
import AssignmentProfileImage from "./AssignmentProfileImage";
import AssignmentFeedback from "./AssignmentFeedback";
import Image from "next/image";
import timestampToIntlDate from "@/utils/timestampToIntlDate";
import { Text } from "sfac-designkit-react";

interface SubmittedItem extends SubmittedAssignment {
  user: User;
  attachment: Attachment;
}

interface IAssignmentTeacherViewCardProps {
  submittedItem: SubmittedItem;
  assignmentId: string;
  user: User;
}

const AssignmentTeacherViewCard: React.FC<IAssignmentTeacherViewCardProps> = ({
  submittedItem,
  assignmentId,
  user: loginUser,
}: IAssignmentTeacherViewCardProps) => {
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const { user, attachment }: SubmittedItem = submittedItem;
  const { attachmentFiles, links } = attachment;

  return (
    <>
      {submittedItem ? (
        <div
          className="flex justify-between items-stretch px-[21px] py-[24px] border rounded-[10px] gap-[5px] mb-[15px]"
          onClick={() => {
            setIsDetailOpen(true);
          }}
        >
          <div className="flex justify-start items-start gap-[14px]">
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
                  weight="medium"
                  className="text-grayscale-40 text-color-Grayscale-40"
                >
                  {user.role}
                </Text>
              </div>
              {attachmentFiles &&
                attachmentFiles.map((item, index) => {
                  return (
                    <Text
                      key={index}
                      size="sm"
                      weight="medium"
                      className="text-grayscale-40 text-color-Grayscale-40 line-clamp-1"
                    >
                      {item.name}
                    </Text>
                  );
                })}
              {links.length > 0 &&
                links.map((item, index) => {
                  return (
                    <Text
                      key={index}
                      size="sm"
                      weight="medium"
                      className="text-grayscale-40 text-color-Grayscale-40 line-clamp-1"
                    >
                      {item}
                    </Text>
                  );
                })}
            </div>
          </div>
          <div className="flex flex-col justify-between items-end">
            <div className="w-[19px] h-[19px]">
              {!submittedItem.isRead ? (
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
              {submittedItem.createdAt
                ? timestampToIntlDate(submittedItem.createdAt, "/")
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
            submittedAssignment={submittedItem}
            loginUser={loginUser}
            assignmentId={assignmentId}
          />
        ) : null}
      </AssignmentModal>
    </>
  );
};

export default AssignmentTeacherViewCard;
