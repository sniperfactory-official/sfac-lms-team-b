"use client";

import React, { useState } from "react";
import CreateAssignments from "./CreateAssignments";
import Modal from "./Modal";

const LeftNav = () => {
  const [isLinkOpen, setIsLinkOpen] = useState(false);

  return (
    <div className="float-left mr-[30px]">
      <div className="w-[245px] p-[13px] rounded-xl bg-[#f5f8ff] ">
        <a href="#">
          <img
            className="inline align-middle mr-1"
            src="https://interactive-examples.mdn.mozilla.net/media/examples/star2.png"
            alt="멍멍"
            width="19px"
          />
          전체과제
        </a>
      </div>
      <div>
        <li className="list-none w-[245px] p-[10px]">
          <a href="#">HTTP 리퀘스트 보내기</a>
        </li>
        <li className="list-none w-[245px] p-[10px]">
          <a href="#">ListTile 커스텀 위젯 만들기</a>
        </li>
        <li className="list-none w-[245px] p-[10px]">
          <a href="#">ListTile 커스텀 위젯 만들기</a>
        </li>
      </div>
      <div className="flex justify-center items-center w-[246px] h-[46px] mt-[10px] gap-[6px] flex-shrink-0 border border-primary-40 bg-white rounded-[10px]">
        <a
          href="#"
          onClick={() => {
            setIsLinkOpen(true);
          }}
        >
          <img
            className="inline align-middle"
            src="https://interactive-examples.mdn.mozilla.net/media/examples/star2.png"
            alt="멍멍"
          />
          과제 만들기
        </a>
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
        <a href="#">
          <img
            className="inline align-middle"
            src="https://interactive-examples.mdn.mozilla.net/media/examples/star2.png"
            alt="멍멍"
          />
          순서 변경
        </a>
      </div>
    </div>
  );
};

export default LeftNav;
