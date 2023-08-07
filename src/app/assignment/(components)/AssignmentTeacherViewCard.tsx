"use client";
import { useState } from "react";
import { User, Attachment, SubmittedAssignment } from "@/types/firebase.types";
import AssignmentModal from "./AssignmentModal";
import AssignmentProfileImage from "./AssignmentProfileImage";
import AssignmentFeedback from "./AssignmentFeedback";
import Image from "next/image";
import timestampToDate from "@/utils/timestampToDate";

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
  const { profileImage } = user;

  return (
    <>
      {submittedItem ? (
        <div
          className="flex justify-between items-start px-[21px] py-[24px] border rounded-[10px] gap-[5px] mb-[15px]"
          onClick={() => {
            setIsDetailOpen(true);
          }}
        >
          <div className="flex justify-start items-start gap-[14px]">
            <AssignmentProfileImage profileImage={user.profileImage} />
            <div>
              <div className="mb-[5px] flex justify-start items-center gap-[6px]">
                <span className="text-grayscale-100 text-[16px] font-[700]">
                  {user.username}
                </span>
                <span className="w-[5px] h-[5px] bg-grayscale-20 rounded-full" />
                <span className="text-grayscale-40 text-[14px] font-[400]">
                  {user.role}
                </span>
              </div>
              {attachmentFiles &&
                attachmentFiles.map((item, index) => {
                  return (
                    <p
                      key={index}
                      className="text-grayscale-40 text-[14px] font-[400] line-clamp-1"
                    >
                      {item.name}
                    </p>
                  );
                })}
              {links.length > 0 &&
                links.map((item, index) => {
                  return (
                    <p
                      key={index}
                      className="text-grayscale-40 text-[14px] font-[400] line-clamp-1"
                    >
                      {item}
                    </p>
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
            <p className="text-grayscale-40 text-[14px] font-[500] mt-[5px]">
              {timestampToDate(submittedItem.createdAt)}
            </p>
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
            submittedAssignmentUser={submittedItem.user}
            loginUser={loginUser}
            submittedAssignmentId={submittedItem.id}
            submittedAssignmentDate={submittedItem.createdAt}
            assignmentId={assignmentId}
            isRead={submittedItem.isRead}
          />
        ) : null}
      </AssignmentModal>
    </>
  );
};

export default AssignmentTeacherViewCard;
