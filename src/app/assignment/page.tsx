"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { User } from "@/types/firebase.types";
import { NextPage } from "next";
import useUserInfo from "@/hooks/user/useUserInfo";
import AssignmentListContent from "./(components)/AssignmentListContent";

const Assignment: NextPage = () => {
  const userInfo = useSelector((state: RootState) => {
    return state.userInfo;
  });
  const user = useUserInfo(userInfo.id) as User;
  const userInfoCopied = { ...user };

  return (
    <div>
      <AssignmentListContent userInfo={userInfoCopied} userId={userInfo.id} />
    </div>
  );
};

export default Assignment;
