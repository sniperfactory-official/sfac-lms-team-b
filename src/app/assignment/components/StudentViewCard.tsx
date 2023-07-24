"use client";

import React, { useState } from "react";
import ProfileImage from "./ProfileImage";
import Modal from "./Modal";
import SubmitAssignmentWithLink from "./SubmitAssignmentWithLink";
import SubmitAssignmentWithFile from "./SubmitAssignmentWithFile";

const StudentViewCard: React.FC = () => {
  const [isLinkOpen, setIsLinkOpen] = useState(false);
  const [isFileOpen, setIsFileOpen] = useState(false);

  return (
    <>
      <div className="flex justify-between content-center px-[21px] py-[24px] border rounded-[10px]">
        <div className="flex justify-start content-center gap-[14px]">
          <ProfileImage />
          <div>
            <div className="mb-[5px]">
              <span className="mr-[15px] text-grayscale-100 text-[16px] font-[700]">
                김지은
              </span>
              <span className="text-grayscale-40 text-[14px] font-[400]">
                수강생
              </span>
            </div>
            <span className="py-[4px] px-[10px] text-[10px] font-[500] text-grayscale-60 rounded-[4px] bg-grayscale-5">
              제출 전
            </span>
          </div>
        </div>
        <div className="flex justify-end content-center gap-[14px]">
          <button
            type="button"
            className="border"
            onClick={() => {
              setIsFileOpen(true);
            }}
          >
            파일 첨부
          </button>
          <button
            type="button"
            className="border"
            onClick={() => {
              setIsLinkOpen(true);
            }}
          >
            링크
          </button>
        </div>
      </div>
      {/* 과제: 링크 제출 */}
      <Modal
        title="과제 제출"
        isOpen={isLinkOpen}
        onClose={() => {
          setIsLinkOpen(false);
        }}
      >
        <SubmitAssignmentWithLink />
      </Modal>

      {/* 과제: 파일 제출 */}
      <Modal
        title="과제 제출"
        isOpen={isFileOpen}
        onClose={() => {
          setIsFileOpen(false);
        }}
      >
        <SubmitAssignmentWithFile />
      </Modal>
    </>
  );
};

export default StudentViewCard;
