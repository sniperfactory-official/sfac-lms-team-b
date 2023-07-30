// 7.21 - feedback modal ui - (LJH)

"use client";

import {
  collection,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { useEffect } from "react";
import { useGetAssignment } from "@/hooks/queries/useGetAssignment";
import { useCreateAssignment } from "@/hooks/mutation/useCreateAssignment";
import { useGetSubmittedAssignments } from "@/hooks/queries/useGetSubmittedAssignment";
import AssignmentProfileImage from "./AssignmentProfileImage";

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

const AssignmentFeedback = () => {

  // const { data, isLoading, error } = useGetAssignment();
  // console.log(data);
  // console.log(isLoading);
  // console.log(error);
  // `yjQmFY45VoZduNQ4Twxy`

  // const { data, isLoading, error } = useGetSubmittedAssignments();
  // console.log(data);
  // console.log(isLoading);
  // console.log(error);

  return (
    <div>
      {/* uploaded */}
      <div className="rounded-[10px] border border-grayscale-10 bg-grayscale-0 p-[24px_24px_16px_24px] mb-[12px]">
        <div className="flex mb-[22px] items-center">
          <AssignmentProfileImage />
          <div className="ml-[13px]">
            <span className="font-[700] text-grayscale-100">
              {user[1].username}
            </span>
            <span className="text-grayscale-20 font-[400]">
              {" "}
              &middot; {"수강생"}
            </span>
          </div>
        </div>
        <ul className="space-y-[12px] mb-[10px]">
          <li>파일 & 링크</li>
          <li>파일 & 링크</li>
          <li>파일 & 링크</li>
        </ul>
        <p className="text-[12px] text-end text-grayscale-40">{"3일전"}</p>
      </div>
      {/* feedback */}
      <ul className="space-y-[13px] mb-[18px] h-[290px] overflow-y-scroll ">
        {[1, 2, 3, 4, 5, 6].map((a, i) => {
          return (
            <li
              key={i}
              className="rounded-[10px] border border-grayscale-10 bg-grayscale-0 p-[24px_24px_16px_24px]"
            >
              <div className="flex mb-[18px] items-center">
                <AssignmentProfileImage />
                <div className="ml-[13px]">
                  <span className="font-[700] text-grayscale-100">
                    {"이름"}
                  </span>
                  <span className="text-grayscale-20 font-[400]">
                    {" "}
                    &middot; {"수강생"}
                  </span>
                </div>
              </div>
              <p className="text-[12px]">{"본문"}</p>
              <p className="text-[12px] text-end text-grayscale-40">
                {"3일전"}
              </p>
            </li>
          );
        })}
      </ul>
      {/* feedback_upload */}
      <div className="rounded-[10px] border border-grayscale-10 bg-grayscale-0 p-[12px_20px]">
        <div className="flex mb-[8px] items-center">
          <AssignmentProfileImage />
          <p className="font-[500] text-grayscale-60 ml-[13px]">{"이름"}</p>
        </div>
        <form className="flex justify-between">
          <input
            className="outline-none placeholder:text-grayscale-20"
            placeholder="댓글을 입력해주세요."
          />
          <button className="bg-primary-80 p-[5px_32px] text-white text-[14px] font-[500] rounded-md">
            업로드
          </button>
        </form>
      </div>
    </div>
  );
};

export default AssignmentFeedback;

