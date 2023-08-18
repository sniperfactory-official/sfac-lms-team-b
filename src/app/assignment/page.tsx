"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { User } from "@/types/firebase.types";
import { NextPage } from "next";
import AssignmentListContent from "./(components)/AssignmentListContent";

const Assignment: NextPage = () => {
  const user = useSelector((state: RootState): User => state.userInfo);

  return (
    <div>
      <AssignmentListContent user={user} />
    </div>
  );
};

export default Assignment;
