"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import type { User } from "@/types/firebase.types";
import { NextPage } from "next";
import AssignmentDetailContent from "../(components)/AssignmentDetailContent";
import AssignmentTeacherViewCardWrapper from "../(components)/AssignmentTeacherViewCardWrapper";
import AssignmentStudentViewCardWrapper from "../(components)/AssignmentStudentViewCardWrapper";

const AssignmentDetailPage: NextPage = () => {
  // FIXME: 임시 유저 정보 처리
  const user = useSelector((state: RootState): User => state.userInfo);

  return (
    <div className="py-[36px] px-[20px]">
      <AssignmentDetailContent user={user} />
      {/* 강사용카드 */}
      {user?.role === "관리자" ? (
        <AssignmentTeacherViewCardWrapper user={user} />
      ) : null}
      {/* END 강사용카드 */}

      {/* 학생용카드 */}
      {user?.role === "수강생" ? (
        <AssignmentStudentViewCardWrapper user={user} />
      ) : null}
      {/* END 학생용카드 */}
    </div>
  );
};

export default AssignmentDetailPage;
