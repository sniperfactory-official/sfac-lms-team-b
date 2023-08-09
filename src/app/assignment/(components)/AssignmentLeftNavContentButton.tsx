"use client";

import "sfac-designkit-react/style.css";
import { Button } from "sfac-designkit-react";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { User } from "@/types/firebase.types";
import AssignmentCreate from "./AssignmentCreate";
import AssignmentModal from "./AssignmentModal";
import AssignmentGlobalConfirmPopup from "./AssignmentGlobalConfirmPopup";

interface Props {
  userInfo: User;
  UpdateAssignmentOrder: () => void;
  ResetEditting: () => void;
  modeChanger: () => void;
}

const AssignmentLeftNavButton = (props: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);
  const [isActivated, setIsActivated] = useState<boolean>(false);
  const resetEditting = props.ResetEditting;

  useEffect(() => {
    const handleKeyPress = (event: any) => {
      if (event.key === "Escape") {
        setIsActivated(false);
        setIsConfirmed(false);
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
          <div className="flex justify-center items-center h-[46px] mt-[10px] flex-shrink-0 border border-primary-40 bg-white rounded-[10px]">
            <button
              className="flex justify-center items-center gap-[6px]"
              type="button"
              onClick={() => {
                setIsOpen(true);
              }}
            >
              <Image
                className="inline"
                src="/images/plus.svg"
                alt=""
                width={23}
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
            <div>
              <div className="flex h-[46px] gap-[15px] mx-0 my-[10px] flex-shrink-0">
                <Button
                  variant="primary"
                  text="적용"
                  type="button"
                  asChild
                  className="w-full h-full"
                  onClick={() => {
                    updateAndDeactivate();
                  }}
                ></Button>
                <Button
                  variant="destructive"
                  text="선택삭제"
                  type="button"
                  className="w-full h-full"
                  asChild
                  onClick={() => {
                    setIsConfirmed(true);
                  }}
                ></Button>
                <AssignmentGlobalConfirmPopup
                  isOpen={isConfirmed}
                  title="강의를 삭제하시겠습니까?"
                  onCancel={() => {
                    setIsConfirmed(false);
                  }}
                >
                  <Button
                    variant="secondary"
                    text="취소"
                    onClick={() => {
                      setIsConfirmed(false);
                    }}
                  />
                  <Button
                    variant="destructive"
                    text="삭제"
                    type="submit"
                    onClick={() => {
                      setTimeout(() => {
                        setIsConfirmed(false);
                        setIsActivated(false);
                      }, 1000);
                    }}
                    form="assign"
                    name="assign"
                  />
                </AssignmentGlobalConfirmPopup>
              </div>
              <p className="w-full h-[46px] rounded-[10px] mt-[36px] bg-primary-5 text-center text-primary-50 leading-[46px]">
                이 작업은 실시간으로 반영됩니다.
              </p>
            </div>
          ) : (
            <div className="flex justify-center items-center w-full h-[46px] mt-[10px] flex-shrink-0 border border-primary-40 bg-white rounded-[10px]">
              <button
                type="button"
                onClick={() => {
                  executeEditing();
                }}
                className="flex gap-[6px]"
              >
                <Image
                  className="inline"
                  src="/images/edit.svg"
                  alt=""
                  width={23}
                  height={22}
                />
                과제수정
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
