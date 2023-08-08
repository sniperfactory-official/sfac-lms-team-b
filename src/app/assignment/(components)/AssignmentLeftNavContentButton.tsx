"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { User } from "@/types/firebase.types";
import AssignmentCreate from "./AssignmentCreate";
import AssignmentModal from "./AssignmentModal";

interface Props {
  userInfo: User;
  UpdateAssignmentOrder: () => void;
  ResetEditting: () => void;
  modeChanger: () => void;
}

const AssignmentLeftNavButton = (props: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isActivated, setIsActivated] = useState<boolean>(false);
  const resetEditting = props.ResetEditting;

  useEffect(() => {
    const handleKeyPress = (event: any) => {
      if (event.key === "Escape") {
        setIsActivated(false);
        resetEditting();
      }
    };

    if (isActivated === true) {
      window.addEventListener("keydown", handleKeyPress);
    } else {
      window.removeEventListener("keydown", handleKeyPress);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [isActivated, resetEditting]);

  const executeEditing = () => {
    props.modeChanger();
    setIsActivated(true);
  };

  const updateAndDeactivate = () => {
    props.UpdateAssignmentOrder();
    setIsActivated(false);
  };
  return (
    <div>
      {props.userInfo.role === "관리자" ? (
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
            isBottomButton={true}
            onClose={() => {
              setIsOpen(false);
            }}
          >
            <AssignmentCreate isOpen={isOpen} setIsOpen={setIsOpen} />
          </AssignmentModal>
          {isActivated ? (
            <div className="flex justify-center items-center h-[46px] mx-0 my-[10px] gap-[6px] flex-shrink-0 bg-white rounded-[10px] ">
              <button
                type="button"
                onClick={() => {
                  updateAndDeactivate();
                }}
                className="w-full h-[35px] rounded-lg bg-[#337AFF] text-slate-50"
              >
                <span className="m-auto">적용</span>
              </button>
              <button
                type="submit"
                onClick={() => {
                  setTimeout(() => {
                    setIsActivated(false), 1000;
                  });
                }}
                form="assign"
                name="assign"
                className="w-full h-[35px] rounded-lg  bg-[#FF0000] text-slate-50 "
              >
                <span className="m-auto">선택 삭제</span>
              </button>
            </div>
          ) : (
            <div className="flex justify-center items-center w-full h-[46px] mt-[10px] gap-[6px] flex-shrink-0 border border-primary-40 bg-white rounded-[10px]">
              <button
                type="button"
                onClick={() => {
                  executeEditing();
                }}
                className="flex justify-center items-center gap-[6px]"
              >
                <Image
                  className="inline align-middle"
                  src="/images/edit.svg"
                  alt=""
                  width={22}
                  height={22}
                />
                <span>과제 수정</span>
              </button>
            </div>
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default AssignmentLeftNavButton;
