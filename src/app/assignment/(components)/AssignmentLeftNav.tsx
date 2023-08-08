"use client";
import "sfac-designkit-react/style.css"
import { useSelector } from "react-redux";
import Link from "next/link";
import useUserInfo from "@/hooks/user/useUserInfo";
import { RootState } from "@/redux/store";
import { User } from "@/types/firebase.types";
import AssignmentLeftNavContent from "./AssignmentLeftNavContent";


const AssignmentLeftNav = () => {
  const userId = useSelector((state: RootState) => {
    return state.userId;
  });
  const user = useUserInfo(userId.uid) as User;
  const userInfo = { ...user };

  return (
    <div className="w-full flex flex-col items-center justify-start">
      <div className="w-full p-[13px] rounded-[10px] bg-[#f5f8ff] ">
          <Link href="/assignment">
            전체과제
          </Link>
      </div>
      <ul className="w-full">
        <AssignmentLeftNavContent userInfo={userInfo} />
      </ul>
    </div>
  );
};

export default AssignmentLeftNav;
