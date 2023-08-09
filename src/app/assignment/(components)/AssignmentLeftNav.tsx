"use client";

import "sfac-designkit-react/style.css";
import { useSelector } from "react-redux";
import Link from "next/link";
import useUserInfo from "@/hooks/user/useUserInfo";
import { RootState } from "@/redux/store";
import { User } from "@/types/firebase.types";
import AssignmentLeftNavContent from "./AssignmentLeftNavContent";
import Image from "next/image";

const AssignmentLeftNav = () => {
  const userInfo = useSelector((state: RootState) => {
    return state.userInfo;
  });
  const user = useUserInfo(userInfo.id) as User;
  const userInfoCopied = { ...user };

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
        <AssignmentLeftNavContent userInfo={userInfoCopied} />
      </ul>
    </div>
  );
};

export default AssignmentLeftNav;
