"use client";

import "sfac-designkit-react/style.css";
import { Button, Text } from "sfac-designkit-react";
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
              className="w-full flex justify-center items-center gap-[6px]"
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
              <Text
                size="base"
                weight="bold"
                className="text-color-Primary-80 text-primary-80"
              >
                과제 만들기
              </Text>
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
              <div className="flex gap-[15px] mx-0 mt-[20px] flex-shrink-0">
                <Button
                  variant="primary"
                  text="적용"
                  type="button"
                  asChild
                  className="w-1/2"
                  onClick={() => {
                    updateAndDeactivate();
                  }}
                ></Button>
                <Button
                  variant="destructive"
                  text="선택삭제"
                  type="button"
                  className="whitespace-nowrap w-1/2"
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
                    asChild
                    className="w-[115px]"
                    onClick={() => {
                      setIsConfirmed(false);
                    }}
                  />
                  <Button
                    asChild
                    variant="destructive"
                    text="삭제"
                    className="w-[115px]"
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

              <p className="w-full py-[11px] rounded-[10px] mt-[36px] bg-primary-5 text-center">
                <Text
                  size="base"
                  weight="semibold"
                  className="text-primary-50 tracking-[-2px]"
                >
                  이 작업은 실시간으로 반영됩니다.
                </Text>
              </p>
            </div>
          ) : (
            <div className="flex justify-center items-center w-full h-[46px] mt-[10px] flex-shrink-0 border border-primary-40 bg-white rounded-[10px]">
              <button
                type="button"
                onClick={() => {
                  executeEditing();
                }}
                className="w-full flex justify-center items-center gap-[6px]"
              >
                <Image
                  className="inline"
                  src="/images/edit.svg"
                  alt=""
                  width={23}
                  height={22}
                />
                <Text
                  size="base"
                  weight="bold"
                  className="text-color-Primary-80 text-primary-80"
                >
                  과제 수정
                </Text>
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
