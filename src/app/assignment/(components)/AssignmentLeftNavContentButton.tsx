"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import AssignmentCreate from "./AssignmentCreate";
import AssignmentModal from "./AssignmentModal";
import { Props } from "./AssignmentLeftNavContent";

interface Props2 extends Props {
  UpdateAssignmentOrder: () => void;
  ResetEditting: () => void;
}

const AssignmentLeftNavButton = (prop: Props2) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isActivated, setIsActivated] = useState<boolean>(false);
  console.log("[AssignmentLeftNavButton] 실행!");

  const handleKeyPress = event => {
    if (event.keyCode === 27) {
      setIsActivated(false);
      prop.ResetEditting();
    }
  };

  useEffect(() => {
    if (isActivated === true) {
      window.addEventListener("keydown", handleKeyPress);
    } else {
      window.removeEventListener("keydown", handleKeyPress);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [isActivated]);

  const executeEditing = () => {
    prop.modeChanger();
    setIsActivated(true);
  };

  const updateAndDeactivate = () => {
    prop.UpdateAssignmentOrder();
    setIsActivated(false);
  };
  return (
    <div>
      {prop.userInfo.role === "관리자" ? (
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
            isBottomButton={false}
            onClose={() => {
              setIsOpen(false);
            }}
          >
            <AssignmentCreate isOpen={isOpen} setIsOpen={setIsOpen} />
          </AssignmentModal>
          {isActivated ? (
            <div className="flex justify-center items-center w-full h-[46px] mx-0 my-[10px] gap-[6px] flex-shrink-0 bg-white rounded-[10px] ">
              <button
                type="button"
                onClick={() => {
                  updateAndDeactivate();
                }}
                form="assign"
                name="assign"
                className="w-[115px] h-[35px] p-[9px] rounded-lg flex bg-[#337AFF] text-slate-50"
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
                className="w-[115px] h-[35px] p-[9px] rounded-lg flex bg-[#FF0000] text-slate-50 "
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
