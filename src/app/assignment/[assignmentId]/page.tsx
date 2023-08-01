import type { User } from "@/types/firebase.types";
import AssignmentDetailContent from "../(components)/AssignmentDetailContent";
import AssignmentTeacherViewCardWrapper from "../(components)/AssignmentTeacherViewCardWrapper";
import AssignmentStudentViewCardWrapper from "../(components)/AssignmentStudentViewCardWrapper";

// FIXME: 임시 유저 정보, 추후 firebase 들고 오면 삭제, 삭제시 반드시 binding 확인
const user: User = {
  id: "id",
  role: "수강생", // 관리자, 수강생
  username: "김지은",
};

const AssignmentDetailPage = () => {
  return (
    <div className="py-[36px] px-[20px]">
      <AssignmentDetailContent user={user} />
      {/* 강사용카드 */}
      {user.role === "관리자" ? (
        <AssignmentTeacherViewCardWrapper user={user} />
      ) : null}
      {/* END 강사용카드 */}

      {/* 학생용카드 */}
      {user.role === "수강생" ? (
        <AssignmentStudentViewCardWrapper user={user} />
      ) : null}
      {/* END 학생용카드 */}
    </div>
  );
};

export default AssignmentDetailPage;
