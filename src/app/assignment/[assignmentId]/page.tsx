"use client";

import type { User } from "@/types/firebase.types";
import AssignmentDetailContent from "../(components)/AssignmentDetailContent";
import AssignmentTeacherViewCardWrapper from "../(components)/AssignmentTeacherViewCardWrapper";
import AssignmentStudentViewCardWrapper from "../(components)/AssignmentStudentViewCardWrapper";
import { useSelector } from "react-redux";
import useUserInfo from "@/hooks/user/useUserInfo";
import { RootState } from "@/redux/store";

const AssignmentDetailPage = () => {
  // FIXME: 임시 유저 정보 처리
  const userId = useSelector((state: RootState) => {
    return state.userId;
  });

  const user = useUserInfo(userId.uid) as User;

  return (
    <div className="py-[36px] px-[20px]">
      <AssignmentDetailContent user={user} />
      {/* 강사용카드 */}
      {user?.role === "관리자" ? <AssignmentTeacherViewCardWrapper /> : null}
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
