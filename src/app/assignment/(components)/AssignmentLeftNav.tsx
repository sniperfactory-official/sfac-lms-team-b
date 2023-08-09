"use client";

import { useSelector } from "react-redux";
import Link from "next/link";
import Image from "next/image";
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
        <div className="flex justify-start items-center px-[20px] py-[13px] rounded-[10px] bg-[#f5f8ff] ">
          <Image
            className="inline align-middle mr-[10px]"
            src="/images/icon_target.svg"
            alt=""
            width={20}
            height={20}
          />
          <Text size="base" weight="semibold">
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
