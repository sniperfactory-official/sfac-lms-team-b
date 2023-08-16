"use client";

import { useState, useEffect, useRef } from "react";
import { useGetFeedbacks } from "@/hooks/queries/useGetFeedbacks";
import { useCreateFeedback } from "@/hooks/mutation/useCreateFeedback";
import { useUpdateSubmittedAssignment } from "@/hooks/mutation/useUpdateSubmittedAssignment";
import { useDeleteSubmittedAssignment } from "@/hooks/mutation/useDeleteSubmittedAssignment";
import { Feedback, User } from "@/types/firebase.types";
import { useForm } from "react-hook-form";
import { getTime } from "@/utils/getTime";
import { Avatar, Button, Text } from "sfac-designkit-react";
import { DocumentReference } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import AssignmentFeedbackContent from "./AssignmentFeedbackContent";
import AssignmentLocalConfirmDialog from "./AssignmentLocalConfirmDialog";
import LoadingSpinner from "@/components/Loading/Loading";

interface IAssignmentFeedbackProps {
  submittedAssignment: any;
  assignmentId: string;
  loginUser: User;
  setIsDetailOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

interface IFeedbackForm {
  feedback: string;
}

interface IFeedback {
  id: string;
  user?: User;
  userId: DocumentReference;
  content: string;
  createdAt: string;
  updatedAt: string;
}

const AssignmentFeedback = ({
  submittedAssignment,
  assignmentId,
  loginUser,
}: IAssignmentFeedbackProps) => {
  const {
    id,
    attachment: { attachmentFiles, links },
    user,
    createdAt,
    isRead,
  } = submittedAssignment;
  const [updateDelete, setUpdateDelete] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const createdDate = getTime(createdAt.toDate());
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
  } = useGetFeedbacks(id);

  const {
    mutate: createMutate,
    isLoading: createLoading,
    error: createError,
  } = useCreateFeedback(id, loginUser.id);

  const {
    mutate: updateMutate,
    isLoading: updateLoading,
    error: updateError,
  } = useUpdateSubmittedAssignment(assignmentId!, id);

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
    const timer = setTimeout(() => {
      if (element) {
        element.scrollTop = element.scrollHeight;
      }
    }, 350);
    return () => clearTimeout(timer);
  }, [feedbacks?.length]);

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
          <Avatar
            ringColor="ring-grayscale-10"
            className="ring-1"
            src={user.profileImage}
          />
          <div className="flex items-center ml-[13px] justify-between w-full">
            <div className="flex justify-start items-center">
              <Text size="base" weight="bold" className="text-grayscale-100">
                {user.username}
              </Text>
              <span className="w-[5px] h-[5px] bg-grayscale-20 rounded-full mx-[6px]"></span>
              <Text size="base" weight="medium" className="text-grayscale-40">
                {user.role}
              </Text>
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
          {/* 링크 & 파일 */}
          {links.includes("")
            ? attachmentFiles.map(({ name, url }: any) => {
                return (
                  <li key={url}>
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
                      <Text
                        size="base"
                        weight="bold"
                        className=" text-primary-80 "
                      >
                        <a href={url} download>
                          {name}
                        </a>
                      </Text>
                    </div>
                  </li>
                );
              })
            : links.map((link: string) => {
                return (
                  <li key={link}>
                    <Link
                      className="block text-[14px] text-primary-100 font-[400] mb-[3px] break-all"
                      href={link}
                      target="_blank"
                    >
                      {link}
                    </Link>
                  </li>
                );
              })}
        </ul>
        <div className="text-end">
          <Text size="xs" weight="medium" className=" text-grayscale-40">
            {createdDate}
          </Text>
        </div>
      </div>
      {/* feedback */}
      <ul
        ref={scrollRef}
        className="space-y-[13px] mb-[18px] h-[290px] overflow-y-scroll scroll-smooth"
      >
        {getLoading ? (
          <LoadingSpinner />
        ) : (
          feedbacks?.map((feedback: IFeedback) => {
            console.log(feedback.createdAt);

            return (
              <AssignmentFeedbackContent
                key={feedback.id}
                id={feedback.id}
                content={feedback.content}
                createdAt={feedback.createdAt}
                updatedAt={feedback.updatedAt}
                user={feedback.user!}
                userId={feedback.userId}
                submittedAssignmentId={id}
                loginUserId={loginUser.id}
                updateDelete={updateDelete}
                setUpdateDelete={setUpdateDelete}
              />
            );
          })
        )}
      </ul>
      {/* feedback_upload */}
      <div className="rounded-[10px] border border-grayscale-10 bg-grayscale-0 p-[12px_20px]">
        <div className="flex justify-start items-start gap-[11px]">
          <Avatar
            ringColor="ring-grayscale-10"
            className="ring-1"
            src={loginUser.profileImage}
          />
          <div className="grow space-y-[9px]">
            <Text size="base" weight="medium" className=" text-grayscale-60 ">
              {loginUser.username}
            </Text>
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
                <Button
                  type="submit"
                  className="max-w-[115px]"
                  variant="primary"
                  disabled={!isValid}
                  asChild
                  text=" 업로드 "
                  textSize="base"
                  textWeight="bold"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
      <AssignmentLocalConfirmDialog
        title="삭제하시겠습니까?"
        content="한번 삭제하시면 다시 복구가 불가능합니다."
        confirmBtnMsg="확인"
        onConfirm={() => deleteMutate(id)}
        isOpen={isConfirmOpen}
        onCancel={() => setIsConfirmOpen(prev => !prev)}
      />
    </div>
  );
};

export default AssignmentFeedback;
