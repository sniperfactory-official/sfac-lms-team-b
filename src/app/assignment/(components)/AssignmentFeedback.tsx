"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { useGetFeedbacks } from "@/hooks/queries/useGetFeedbacks";
import { useCreateFeedback } from "@/hooks/mutation/useCreateFeedback";
import { useUpdateSubmittedAssignment } from "@/hooks/mutation/useUpdateSubmittedAssignment";
import { useDeleteSubmittedAssignment } from "@/hooks/mutation/useDeleteSubmittedAssignment";
import { Feedback, User } from "@/types/firebase.types";
import { useForm } from "react-hook-form";
import { Timestamp } from "firebase/firestore";
import AssignmentProfileImage from "./AssignmentProfileImage";
import Image from "next/image";
import Link from "next/link";
import AssignmentFeedbackContent from "./AssignmentFeedbackContent";
import AssignmentLocalConfirmDialog from "./AssignmentLocalConfirmDialog";
import { getTime } from "@/utils/getTime";

interface IAssignmentFeedbackProps {
  submittedAssignmentId: string;
  assignmentId: string;
  isRead?: boolean;
  loginUser: User;
  submittedAssignmentUser: User;
  setIsDetailOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  submittedAssignmentDate: Timestamp;
}

interface IFeedbackForm {
  feedback: string;
}

const AssignmentFeedback = ({
  submittedAssignmentId,
  assignmentId,
  submittedAssignmentUser,
  isRead,
  loginUser,
  setIsDetailOpen,
  submittedAssignmentDate,
}: IAssignmentFeedbackProps) => {
  const [updateDelete, setUpdateDelete] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const createdDate = getTime(submittedAssignmentDate.toDate());
  const scrollRef = useRef<HTMLUListElement>(null);

  const {
    register,
    handleSubmit,
    formState: { isValid },
    reset,
  } = useForm<IFeedbackForm>({ mode: "onChange" });

  const {
    data: feedbacks,
    isLoading: getLoading,
    error: getError,
  } = useGetFeedbacks(submittedAssignmentId);

  const {
    mutate: createMutate,
    isLoading: createLoading,
    error: createError,
  } = useCreateFeedback(submittedAssignmentId, loginUser.id);

  const {
    mutate: updateMutate,
    isLoading: updateLoading,
    error: updateError,
  } = useUpdateSubmittedAssignment(assignmentId!, submittedAssignmentId);

  const {
    mutate: deleteMutate,
    isLoading: deleteLoading,
    error: deleteError,
  } = useDeleteSubmittedAssignment(assignmentId, loginUser.id);

  const onValid = (textValue: IFeedbackForm) => {
    createMutate({
      content: textValue.feedback,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    reset();
  };

  const handleDeleteSubmittedAssignment = () => {
    setIsConfirmOpen(prev => !prev);
  };

  // 스크롤 최하단으로 최신피드백 보여주기
  useEffect(() => {
    const element = scrollRef.current;
    // narrowing
    if (element) {
      element.scrollTop = element.scrollHeight;
    }
  }, [feedbacks]);

  // 불필요한 post 요청 방지 useCallback? useMemo?
  useEffect(() => {
    if (loginUser?.role === "관리자" && isRead === false) {
      updateMutate({ isRead: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {/* uploaded */}
      <div className="rounded-[10px] border border-grayscale-10 bg-grayscale-0 p-[24px_24px_16px_24px] mb-[12px]">
        <div className="flex mb-[22px] items-center">
          <AssignmentProfileImage
            profileImage={submittedAssignmentUser.profileImage}
          />
          <div className="flex items-center ml-[13px] justify-between w-full">
            <div>
              <span className="text-[16px] font-[700] text-grayscale-100">
                {submittedAssignmentUser.username}
              </span>
              <span className="w-[5px] h-[5px] bg-grayscale-20 rounded-full mx-[6px]"></span>
              <span className="text-grayscale-40 font-[400]">
                {submittedAssignmentUser.role}
              </span>
            </div>
            {loginUser.role === "수강생" &&
            !feedbacks?.find(
              (feedback: Feedback) => feedback?.user?.role === "관리자",
            ) &&
            !isConfirmOpen ? (
              <button
                onClick={handleDeleteSubmittedAssignment}
                className="text-grayscale-100"
              >
                삭제
              </button>
            ) : null}
          </div>
        </div>
        <ul className="space-y-[12px] mb-[10px]">
          <li>
            {/* 파일의 경우 */}
            <div className="flex justify-start items-center gap-[13px] mb-[8px]">
              <div className="w-[36.5px] h-[39.5px]">
                <Image
                  src="/images/fileIcon.svg"
                  alt=""
                  width="0"
                  height="0"
                  className="w-full h-full"
                />
              </div>
              <p className="text-[16px] text-primary-80 font-[700]">
                {"김스팩_과제제출_20221231.pdf"}
              </p>
            </div>
          </li>
          <li>
            {/* 링크의 경우 */}
            <Link
              className="block text-[14px] text-primary-100 font-[400] mb-[3px]"
              href="https://github.com/sniperfactory-official/sfac-lms-team-b"
              target="_blank"
            >
              https://github.com/sniperfactory-official/sfac-lms-team-b
            </Link>
          </li>
        </ul>
        <p className="text-[12px] text-end text-grayscale-40">{createdDate}</p>
      </div>
      {/* feedback */}
      <ul
        ref={scrollRef}
        className="space-y-[13px] mb-[18px] h-[290px] overflow-y-scroll scroll-smooth"
      >
        {getLoading
          ? "Loading..."
          : feedbacks?.map((feedback: Feedback) => {
              return (
                <AssignmentFeedbackContent
                  key={feedback.id}
                  id={feedback.id}
                  content={feedback.content}
                  createdAt={feedback.createdAt}
                  updatedAt={feedback.updatedAt}
                  user={feedback.user}
                  userId={feedback.userId}
                  submittedAssignmentId={submittedAssignmentId}
                  loginUserId={loginUser.id}
                  updateDelete={updateDelete}
                  setUpdateDelete={setUpdateDelete}
                />
              );
            })}
      </ul>
      {/* feedback_upload */}
      <div className="rounded-[10px] border border-grayscale-10 bg-grayscale-0 p-[12px_20px]">
        <div className="flex justify-start items-start gap-[11px]">
          <AssignmentProfileImage profileImage={"profileImage"} />
          <div className="grow">
            <p className="font-[500] text-grayscale-60 text-[16px] mb-[9px]">
              {"이름"}
            </p>
            <form onSubmit={handleSubmit(onValid)} className="w-full">
              <textarea
                {...register("feedback", {
                  required: true,
                })}
                className="w-full outline-none placeholder:text-grayscale-20 grow text-[14px] disabled:bg-white"
                placeholder="댓글을 입력해주세요."
                style={{ resize: "none" }}
                rows={3}
                defaultValue={""}
                maxLength={500}
                disabled={updateDelete}
              />
              <div className="flex justify-end items-center mt-[16px]">
                <button
                  type="submit"
                  disabled={!isValid}
                  className="bg-primary-80 w-[115px] h-[35px] text-white text-[14px] font-[500] rounded-md shrink-0 disabled:bg-grayscale-10 disabled:text-grayscale-20"
                >
                  업로드
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <AssignmentLocalConfirmDialog
        title="삭제하시겠습니까?"
        content="한번 삭제하시면 다시 복구가 불가능합니다."
        confirmBtnMsg="확인"
        onConfirm={() => {
          deleteMutate(submittedAssignmentId);
          setIsDetailOpen!((prev: boolean) => !prev);
          setIsConfirmOpen(prev => !prev);
        }}
        isOpen={isConfirmOpen}
        onCancel={() => setIsConfirmOpen(prev => !prev)}
      />
    </div>
  );
};

export default AssignmentFeedback;
