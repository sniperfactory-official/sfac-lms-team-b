"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import AssignmentCreate from "./AssignmentCreate";
import AssignmentModal from "./AssignmentModal";
import useAuth from "@/hooks/user/useAuth";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { RootState } from "@/redux/store";
import { User } from "@/types/firebase.types";

interface Props {
  userInfo: Object;
  modeChanger: (arg: Event) => void;
}

const AssignmentLeftNavButton = (prop: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  console.log("[AssignmentLeftNavButton] 실행!");
  console.log("좀돼라", prop);

  return (
    <div>
      {"관리자" ? (
        <div>
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
            <div className="flex justify-center items-center w-full h-[46px] mt-[10px] gap-[6px] flex-shrink-0 border border-primary-40 bg-white rounded-[10px]">
              <form
                onSubmit={event => {
                  prop.modeChanger(event);
                }}
                id="type"
                name="type"
              >
                <input
                  type="checkbox"
                  name="type"
                  value="EDIT"
                  className="hidden"
                ></input>
              </form>
              <button
                type="submit"
                form="type"
                name="type"
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
            <div className="flex justify-center items-center w-full h-[46px] mx-0 my-[10px] gap-[6px] flex-shrink-0 bg-white rounded-[10px] ">
              <button
                type="submit"
                form="assign"
                name="assign"
                className="w-[115px] h-[35px] p-[9px] rounded-lg flex bg-[#337AFF] text-slate-50"
              >
                <span className="m-auto">적용</span>
              </button>
              <button
                type="submit"
                form="assign"
                name="assign"
                className="w-[115px] h-[35px] p-[9px] rounded-lg flex bg-[#FF0000] text-slate-50 "
              >
                <span className="m-auto">선택 삭제</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default AssignmentLeftNavButton;
