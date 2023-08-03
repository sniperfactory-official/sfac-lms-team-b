"use client";

import { useState } from "react";
import { useGetFeedbacks } from "@/hooks/queries/useGetFeedbacks";
import { useCreateFeedback } from "@/hooks/mutation/useCreateFeedback";
import AssignmentProfileImage from "./AssignmentProfileImage";
import AssignmentLocalConfirmDialog from "./AssignmentLocalConfirmDialog";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";

const user = [
  {
    id: 1,
    email: "student@gmail.com",
    profileImage: "next.svg",
    role: "ADMIN",
    username: "이선생",
  },
  {
    id: 2,
    email: "student@gmail.com",
    profileImage: "next.svg",
    role: "USER",
    username: "이재훈",
  },
];

interface IAssignmentFeedbackProps {
  submittedAssignmentId: string;
}

const AssignmentFeedback = ({
  submittedAssignmentId,
}: IAssignmentFeedbackProps) => {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const { register, handleSubmit } = useForm();
  const {
    data: feedbacks,
    isLoading,
    error,
  } = useGetFeedbacks(submittedAssignmentId);

  return (
    <div>
      {/* uploaded */}
      <div className="rounded-[10px] border border-grayscale-10 bg-grayscale-0 p-[24px_24px_16px_24px] mb-[12px]">
        <div className="flex mb-[22px] items-center">
          <AssignmentProfileImage profileImage={user[1].profileImage} />
          <div className="flex justify-start items-center ml-[13px]">
            <span className="text-[16px] font-[700] text-grayscale-100">
              {user[1].username}
            </span>
            <span className="w-[5px] h-[5px] bg-grayscale-20 rounded-full mx-[6px]"></span>
            <span className="text-grayscale-40 font-[400]">{"수강생"}</span>
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
        <p className="text-[12px] text-end text-grayscale-40">{"3일전"}</p>
      </div>
      {/* feedback */}
      <ul className="space-y-[13px] mb-[18px] h-[290px] overflow-y-scroll ">
        {isLoading
          ? "Loading..."
          : feedbacks?.map(
              ({
                id,
                content,
                createdAt,
                updatedAt,
                user: { username, role },
              }: any) => {
                return (
                  <li
                    key={id}
                    className="rounded-[10px] border border-grayscale-10 bg-grayscale-0 p-[24px_24px_16px_24px]"
                  >
                    <div className="flex justify-start items-start gap-[13px]">
                      <div className="pt-[3px]">
                        <AssignmentProfileImage profileImage={"profileImage"} />
                      </div>
                      <div className="grow">
                        <div className="flex justify-between items-center mb-[9px]">
                          <div>
                            <span className="font-[700] text-grayscale-100">
                              {username}
                            </span>
                            <span className="text-grayscale-20 font-[400]">
                              {" "}
                              &middot; {role}
                            </span>
                          </div>
                          <div>
                            <button
                              type="button"
                              className="text-grayscale-100 text-[12px] font-[400] after:content-['|'] after:text-grayscale-30 after:ml-[5px] after:mr-[5px]"
                            >
                              수정
                            </button>
                            <button
                              type="button"
                              className="text-grayscale-100 text-[12px] font-[400]"
                              onClick={() => {
                                setIsConfirmOpen(true);
                              }}
                            >
                              삭제
                            </button>
                          </div>
                        </div>
                        <div>
                          <textarea
                            className="w-full text-[14px] text-black font-[400] bg-white"
                            name=""
                            id=""
                            rows={3}
                            disabled={true}
                            style={{ resize: "none" }}
                            defaultValue={content}
                          />
                        </div>
                      </div>
                    </div>
                    <p className="text-[12px] text-end text-grayscale-40">
                      {createdAt === updatedAt ? createdAt : updatedAt}
                    </p>
                  </li>
                );
              },
            )}
      </ul>
      {/* feedback_upload */}
      <div className="rounded-[10px] border border-grayscale-10 bg-grayscale-0 p-[12px_20px]">
        <div className="flex justify-start items-start gap-[11px]">
          <AssignmentProfileImage profileImage={"profileImage"} />
          <div className="grow">
            <p className="font-[500] text-grayscale-60 text-[16px] mb-[9px]">
              {"이름"}
            </p>
            <form className="w-full">
              <textarea
                className="w-full outline-none placeholder:text-grayscale-20 grow text-[14px]"
                placeholder="댓글을 입력해주세요."
                style={{ resize: "none" }}
                rows={3}
                defaultValue={""}
              />
              <div className="flex justify-end items-center mt-[16px]">
                <button
                  type="submit"
                  className="bg-primary-80 w-[115px] h-[35px] text-white text-[14px] font-[500] rounded-md shrink-0"
                >
                  업로드
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* 모달 내 컨펌 모달 예시 */}
      <AssignmentLocalConfirmDialog
        title="삭제하시겠습니까?"
        content="한번 삭제하시면 다시 복구가 불가능합니다."
        confirmBtnMsg="확인"
        onConfirm={() => {
          setIsConfirmOpen(false);
        }}
        isOpen={isConfirmOpen}
        onCancel={() => {
          setIsConfirmOpen(false);
        }}
      />
    </div>
  );
};

export default AssignmentFeedback;
