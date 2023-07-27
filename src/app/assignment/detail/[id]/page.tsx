import EmptyContents from "@/components/EmptyContents";
import ProfileImage from "../../components/ProfileImage";
import TeacherViewCard from "../../components/TeacherViewCard";
import StudentViewCard from "../../components/StudentViewCard";

const Detail = () => {
  return (
    <div className="py-[36px] px-[20px]">
      <div className="px-[20px] py-[29px]">
        <div className="flex justify-start items-center gap-[16px] mb-[31px]">
          <ProfileImage />
          <div>
            <p className="text-[16px] font-[700] text-grayscale-100">
              스나이퍼팩토리
            </p>
            <span className="mr-[15px] text-grayscale-40 text-[16px] font-[400]">
              멘토
            </span>
            <span className="text-grayscale-40 text-[14px] font-[500]">
              2023/06/29
            </span>
          </div>
        </div>
        <div className="pb-[100px]">
          <h3 className="text-grayscale-100 text-[18px] font-[700] mb-[14px]">
            ListTile 커스텀 위젯 만들기
          </h3>
          <p className="text-grayscale-90 text-[14px] font-[400]">
            10일차 과제와 미션을 여기에 보내주세요!
          </p>
        </div>
      </div>
      {/* 강사용카드 */}
      <div>
        <EmptyContents emptyTxt={"제출된 과제가 아직 존재하지 않습니다."} />
        <TeacherViewCard />
      </div>
      {/* END 강사용카드 */}

      {/* 학생용카드 */}
      <StudentViewCard />
      {/* END 학생용카드 */}
    </div>
  );
};

export default Detail;
