"use client";

import React from "react";
import AssignmentListContent from "./(components)/AssignmentListContent";
import { useSelector } from "react-redux";
import useUserInfo from "@/hooks/user/useUserInfo";
import { RootState } from "@/redux/store";
import { User } from "@/types/firebase.types";


const Assignment = () => {
  const userId = useSelector((state: RootState) => {
    return state.userId;
  });

  const user = useUserInfo(userId.uid) as User;
  const userInfo = {...user}
  return (
    <div>
      <AssignmentListContent userInfo={userInfo}/>
    </div>
  );
};

export default Assignment;
