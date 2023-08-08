"use client";

import React from "react";
import { useSelector } from "react-redux";
import useUserInfo from "@/hooks/user/useUserInfo";
import { RootState } from "@/redux/store";
import { User } from "@/types/firebase.types";
import AssignmentListContent from "./(components)/AssignmentListContent";

const Assignment = () => {
  const userId = useSelector((state: RootState) => {
    return state.userId;
  });

  const user = useUserInfo(userId.uid) as User;
  const userInfo = { ...user };

  return (
    <div>
      <AssignmentListContent userInfo={userInfo} userId={userId.uid} />
    </div>
  );
};

export default Assignment;
