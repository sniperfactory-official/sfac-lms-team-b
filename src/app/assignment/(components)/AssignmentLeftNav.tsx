"use client";

import { useSelector } from "react-redux";
import Link from "next/link";
import useUserInfo from "@/hooks/user/useUserInfo";
import { RootState } from "@/redux/store";
import { User } from "@/types/firebase.types";
import AssignmentLeftNavContent from "./AssignmentLeftNavContent";
import { Text } from "sfac-designkit-react";

const AssignmentLeftNav = () => {
  const userInfo = useSelector((state: RootState) => {
    return state.userInfo;
  });
  const user = useUserInfo(userInfo.id) as User;
  const userInfoCopied = { ...user };

  return (
    <div className="w-full min-w-[245px] flex-col items-center justify-start">
      <Link href="/assignment">
        <div className="flex justify-start items-center px-[20px] py-[13px] rounded-[10px] bg-[#f5f8ff] mb-[5px]">
          <span className="text-xl mr-[15px]">🎯</span>
          <Text size="base" weight="semibold" className="text-grayscale-80">
            전체과제
          </Text>
        </div>
      </Link>
      <ul className="w-full">
        <AssignmentLeftNavContent userInfo={userInfoCopied} />
      </ul>
    </div>
  );
};

export default AssignmentLeftNav;
