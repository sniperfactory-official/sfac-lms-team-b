"use client";

import React, { useState } from "react";
import Image from "next/image";
import AssignmentCreate from "./AssignmentCreate";
import AssignmentModal from "./AssignmentModal";
import Link from "next/link";
import AssignmentLeftNavContent from "./AssignmentLeftNavContent";

const USER_INFO = {
  id: 1,
  role: "관리자", // 관리자, 수강생
  username: "김지은",
};

const AssignmentLeftNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full flex flex-col items-center justify-start">
      <div className="w-full p-[13px] rounded-[10px] bg-[#f5f8ff] ">
        <Link href="/assignment">
          <Image
            className="inline align-middle mr-1"
            src="/images/icon_target.svg"
            alt="전체 과제 아이콘"
            width={19}
            height={19}
          />
          전체과제
        </Link>
      </div>
      <ul className="w-full">
        <AssignmentLeftNavContent />
      </ul>
      {USER_INFO.role === "관리자" ? (
        <div className="w-full">
          <div className="flex justify-center items-center w-full h-[46px] mt-[10px] gap-[6px] flex-shrink-0 border border-primary-40 bg-white rounded-[10px]">
            <button
              className="flex justify-center items-center gap-[6px]"
              type="button"
              onClick={() => {
                setIsOpen(true);
              }}
            >
              <Image
                className="inline align-middle"
                src="/images/plus.svg"
                alt=""
                width={22}
                height={22}
              />
              <span>과제 만들기</span>
            </button>
          </div>
          <AssignmentModal
            title="과제만들기"
            isOpen={isOpen}
            onClose={() => {
              setIsOpen(false);
            }}
          >
            <AssignmentCreate />
          </AssignmentModal>
          <div className="flex justify-center items-center w-full h-[46px] mt-[10px] gap-[6px] flex-shrink-0 border border-primary-40 bg-white rounded-[10px]">
            <button
              className="flex justify-center items-center gap-[6px]"
              type="button"
            >
              <Image
                className="inline align-middle"
                src="/images/plus.svg"
                alt=""
                width={22}
                height={22}
              />
              <span>순서 변경</span>
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default AssignmentLeftNav;

