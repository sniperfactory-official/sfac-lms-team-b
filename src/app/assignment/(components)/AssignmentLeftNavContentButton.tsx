"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import AssignmentCreate from "./AssignmentCreate";
import AssignmentModal from "./AssignmentModal";
import useAuth from "@/hooks/user/useAuth";
import useUserInfo from '@/hooks/user/useUserInfo'
import { useSelector } from "react-redux/es/hooks/useSelector";
import { RootState } from "@/redux/store";
import { User } from "@/types/firebase.types";

interface Props{
  userInfo:Object;
  modeChanger : (arg:Event) => void;
}



const AssignmentLeftNavButton = (prop:Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  console.log("[AssignmentLeftNavButton] 실행!");
  console.log("좀돼라", prop)


/*   const lodingRole = ()=>{
    const userId = useSelector((state: RootState) => {
      return state.userId;
    });
    const user = useUserInfo(userId.uid);
    setUserRole(user)
    console.log("user:", user)
  } */


  return (
    <div>
    {"관리자" ? (
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
        <div className="flex justify-center items-center w-full h-[46px] mt-[10px] gap-[6px] flex-shrink-0 border border-primary-40 bg-white rounded-[10px]">
          <button 
          type="submit" form="assign" name="type" value="EDIT"
            className="flex justify-center items-center gap-[6px]"
            onChange={(event)=>{prop.modeChanger(event)}}
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
          <button 
            type="submit" form="assign" name="type" value="CHANGE"
            className="flex justify-center items-center gap-[6px]"
            onChange={(event)=>{prop.modeChanger(event)}}
          >
            <Image
              className="inline align-middle"
              src="/images/plus.svg"
              alt=""
              width={22}
              height={22}
            />
            <span>적용</span>
          </button>
          <button 
            type="submit" form="assign" name="type" value="DELETE"
            className="flex justify-center items-center gap-[6px]"
            onChange={(event)=>{prop.modeChanger(event)}}
          >
            <Image
              className="inline align-middle"
              src="/images/plus.svg"
              alt=""
              width={22}
              height={22}
            />
            <span>삭제</span>
          </button>
        </div>
      </div>
    ) : (
      ""
    )}
    </div>
  )
}

export default AssignmentLeftNavButton;