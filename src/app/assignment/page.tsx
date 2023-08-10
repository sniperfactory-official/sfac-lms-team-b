"use client";

import React from "react";
import { useSelector } from "react-redux";
import useUserInfo from "@/hooks/user/useUserInfo";
import { RootState } from "@/redux/store";
import { User } from "@/types/firebase.types";
import AssignmentListContent from "./(components)/AssignmentListContent";

const Assignment = () => {
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
