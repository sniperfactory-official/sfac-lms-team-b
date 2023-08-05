import { FC } from "react";
import Link from "next/link";
import Image from "next/image";

import useGetLectureInfo from "@/hooks/queries/useGetLectureInfo";
import UserImage from "@/app/classroom/(components)/modal/comment/UserImage";
import timestampToDate from "@/utils/timestampToDate";
import UserInfo from "@/app/classroom/(components)/modal/comment/UserInfo";

interface LectureHeaderProps {
  lectureId: string;
}

const LectureHeader: FC<LectureHeaderProps> = ({ lectureId }) => {
  const { data, isFetching } = useGetLectureInfo(lectureId);

  const { title, user } = data || {};
  const { profileImage, username, role } = user || {};
  const startDay = data?.startDate ? timestampToDate(data.startDate) : "";
  const endDay = data?.endDate ? timestampToDate(data.endDate) : "";

  return (
    <header className="flex border-b border-gray-200 w-full h-[135px]">
      <div className="w-1/12 h-full flex justify-center items-center">
        <Link href="/classroom" className="w-full pr-12 pb-14">
          <Image
            src="/images/arrow-left.svg"
            alt="뒤로가기"
            width={15}
            height={15}
            className="cursor-pointer float-right"
          />
        </Link>
      </div>
      <div className="w-11/12 h-full flex flex-col justify-center">
        {isFetching ? (
          <div className="w-full h-full">{/* <MiniLoadingSpinner/> */}</div>
        ) : (
          data && (
            <>
              <div className="flex flex-col mb-1">
                <h1 className="text-xl font-semibold mb-1.5">{title}</h1>
                <span className="text-gray-700 text-xs">
                  [수강기간]{startDay}~{endDay}
                </span>
              </div>
              <div className="flex items-center mt-2">
                <UserImage profileImage={profileImage} />
                <UserInfo username={username} role={role} isHeader={true} />
              </div>
            </>
          )
        )}
      </div>
    </header>
  );
};

export default LectureHeader;
