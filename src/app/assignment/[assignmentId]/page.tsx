import EmptyContents from "@/components/EmptyContents";
import AssignmentProfileImage from "../(components)/AssignmentProfileImage";
import AssignmentTeacherViewCard from "../(components)/AssignmentTeacherViewCard";
import AssignmentStudentViewCard from "../(components)/AssignmentStudentViewCard";

// FIXME: 임시 유저 정보, 추후 firebase 들고 오면 삭제, 삭제시 반드시 binding 확인
const user = {
  id: 1,
  role: "관리자", // 관리자, 수강생
  username: "김지은",
};

const AssignmentDetailPage = () => {

  return (
    <div className="py-[36px] px-[20px]">
      <div className="px-[20px] py-[29px]">
        <div className="flex justify-between items-start">
          <div className="flex justify-start items-center gap-[16px] mb-[31px]">
            <AssignmentProfileImage />
            <div>
              <div className="flex justify-start items-center gap-[9px]">
                <p className="text-[16px] font-[700] text-grayscale-100">
                  스나이퍼팩토리
                </p>
                {/* FIXME: 강사만 확인 가능한 영역 */}
                {user.role === "관리자" ? (
                  <span className="border border-primary-90 rounded-[4px] text-primary-100 font-[500] text-[10px] px-[3.5px] py-[1px]">
                    63% 읽음
                  </span>
                ) : null}

                {/* END 강사만 확인 가능한 영역 */}
              </div>
              <span className="mr-[15px] text-grayscale-40 text-[16px] font-[400]">
                멘토
              </span>
              <span className="text-grayscale-40 text-[14px] font-[500]">
                2023/06/29
              </span>
            </div>
          </div>
          {/* FIXME: 강사만 확인 가능 영역 */}
          {user.role === "관리자" ? (
            <div className="flex justify-end items-center pt-1">
              <button
                type="button"
                className="text-grayscale-100 text-[12px] font-[400] after:content-['|'] after:text-grayscale-30 after:ml-[6px] after:mr-[6px]"
              >
                수정
              </button>
              <button
                className="text-grayscale-100 text-[12px] font-[400]"
                type="button"
              >
                삭제
              </button>
            </div>
          ) : null}
          {/* END 강사만 확인 가능 영역 */}
        </div>
        {/* FIXME: 과제 존재 유무에 따른 분기처리 필요 */}
        <EmptyContents emptyTxt="과제가 아직 존재하지 않습니다!" />
        <div className="pb-[35px] border-b">
          <h3 className="text-grayscale-100 text-[18px] font-[700] mb-[14px]">
            ListTile 커스텀 위젯 만들기
          </h3>
          <p className="text-grayscale-90 text-[14px] font-[400]">
            10일차 과제와 미션을 여기에 보내주세요!
          </p>
        </div>
      </div>
      {/* 강사용카드 */}
      {user.role === "관리자" ? (
        <div>
          {/* 제출된 과제 존재 유무에 따른 분기처리 필요 */}
          <EmptyContents emptyTxt="제출된 과제가 없습니다" />
          <AssignmentTeacherViewCard />
        </div>
      ) : null}
      {/* END 강사용카드 */}

      {/* 학생용카드 */}
      {user.role === "수강생" ? <AssignmentStudentViewCard /> : null}
      {/* END 학생용카드 */}
    </div>
  );
};

export default AssignmentDetailPage;
