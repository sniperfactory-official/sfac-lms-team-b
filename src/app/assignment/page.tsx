"use client";

import React from "react";
import { useSelector } from "react-redux";
import useUserInfo from "@/hooks/user/useUserInfo";
import { RootState } from "@/redux/store";
import { User } from "@/types/firebase.types";
import AssignmentListContent from "./(components)/AssignmentListContent";

const Assignment = () => {
  const userId = useSelector((state: RootState) => {
    return state.userInfo;
  });

  const user = useUserInfo(userId.id) as User;
  const userInfo = { ...user };

  return (
    <div>
      <AssignmentListContent userInfo={userInfo} userId={userId.id} />
    </div>
  );
};

export default Assignment;
