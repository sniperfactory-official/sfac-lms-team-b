"use client";
import { useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { useGetFeedbacks } from "@/hooks/queries/useGetFeedbacks";
import { useCreateFeedback } from "@/hooks/mutation/useCreateFeedback";
import { useForm } from "react-hook-form";
import PageToast from "@/components/PageToast";
import useUserInfo from "@/hooks/user/useUserInfo";
import AssignmentProfileImage from "./AssignmentProfileImage";
import Image from "next/image";
import Link from "next/link";
import AssignmentFeedbackContent from "./AssignmentFeedbackContent";
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

interface IFormType {
  feedback: string;
}

const AssignmentFeedback = ({
  submittedAssignmentId,
}: IAssignmentFeedbackProps) => {
  // const [toastMsg, setToastMsg] = useState();
  // const [isAccept, setIsAccept] = useState();
  // const [onClose, setOnClose] = useState();

  const loginUserId = useSelector((state: RootState) => {
    return state.userId.uid;
  });

  const scrollRef = useRef<any>(null);

  const {
    register,
    handleSubmit,
    formState: { isValid },
    reset,
  } = useForm<IFormType>({ mode: "onChange" });

  const {
    data: feedbacks,
    isLoading,
    error,
  } = useGetFeedbacks("gZWELALnKoZLzJKjXGUM"); //후에 submittedId로 대체

  const {
    mutate,
    isLoading: loading,
    error: err,
  } = useCreateFeedback("gZWELALnKoZLzJKjXGUM", loginUserId); //후에 submittedId로 대체

  const onValid = (textValue: IFormType) => {
    mutate({
      content: textValue.feedback,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    reset();
  };

  // 스크롤 최하단으로 최신피드백 보여주기
  useEffect(() => {
    const element = scrollRef.current;
    element.scrollTop = element.scrollHeight;
  }, [feedbacks]);

  return (
    <div>
      {/* uploaded */}
      <div className="rounded-[10px] border border-grayscale-10 bg-grayscale-0 p-[24px_24px_16px_24px] mb-[12px]">
        <div className="flex mb-[22px] items-center">
          <AssignmentProfileImage profileImage={user[1].profileImage} />
          <div className="flex items-center ml-[13px] justify-between w-full">
            <div>
              <span className="text-[16px] font-[700] text-grayscale-100">
                {user[1].username}
              </span>
              <span className="w-[5px] h-[5px] bg-grayscale-20 rounded-full mx-[6px]"></span>
              <span className="text-grayscale-40 font-[400]">{"수강생"}</span>
            </div>
            <button>삭제</button>
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
      <ul
        ref={scrollRef}
        className="space-y-[13px] mb-[18px] h-[290px] overflow-y-scroll scroll-smooth"
      >
        {isLoading
          ? "Loading..."
          : feedbacks?.map((feedback: any) => {
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
                  loginUserId={loginUserId}
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
                className="w-full outline-none placeholder:text-grayscale-20 grow text-[14px]"
                placeholder="댓글을 입력해주세요."
                style={{ resize: "none" }}
                rows={3}
                defaultValue={""}
                maxLength={500}
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
          {/* {
            <div className="absolute left-12 bottom-16">
              <PageToast
                toastMsg={toastMsg}
                isAccept={isAccept}
                onClose={onClose}
              />
            </div>
          } */}
        </div>
      </div>
    </div>
  );
};

export default AssignmentFeedback;
