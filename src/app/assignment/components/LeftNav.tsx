"use client";

import React, { useState } from "react";
import CreateAssignments from "./CreateAssignments";
import Modal from "./Modal";
import Link from "next/link";
import LeftNavContent from "./LeftNavContent";

const USER_INFO = {
  id: 1,
  role: "관리자", // 관리자, 수강생
  username: "김지은",
};

const LeftNav = () => {
  const [isLinkOpen, setIsLinkOpen] = useState(false);

  return (
    <div className="float-left mr-[30px]">
      <div className="w-[245px] p-[13px] rounded-xl bg-[#f5f8ff] ">
        <Link href="/assignment/list">
          <img
            className="inline align-middle mr-1"
            src="https://interactive-examples.mdn.mozilla.net/media/examples/star2.png"
            alt="error"
            width="19"
          />
          전체과제
        </Link>
      </div>
      <LeftNavContent />
      {USER_INFO.role === "관리자" ? (
        <div>
          <div className="flex justify-center items-center w-[246px] h-[46px] mt-[10px] gap-[6px] flex-shrink-0 border border-primary-40 bg-white rounded-[10px]">
            <button
              type="button"
              onClick={() => {
                setIsLinkOpen(true);
              }}
            >
              <img
                className="inline align-middle"
                src="https://interactive-examples.mdn.mozilla.net/media/examples/star2.png"
                alt="error"
              />
              과제 만들기
            </button>
          </div>
          <Modal
            title="과제만들기"
            isOpen={isLinkOpen}
            onClose={() => {
              setIsLinkOpen(false);
            }}
          >
            <CreateAssignments />
          </Modal>
          <div className="flex justify-center items-center w-[246px] h-[46px] mt-[10px] gap-[6px] flex-shrink-0 border border-primary-40 bg-white rounded-[10px]">
            <button type="button">
              <img
                className="inline align-middle"
                src="https://interactive-examples.mdn.mozilla.net/media/examples/star2.png"
                alt="error"
              />
              순서 변경
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default LeftNav;
