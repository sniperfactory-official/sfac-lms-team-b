import { FC } from "react";
import Link from "next/link";
import { Lecture } from "@/types/firebase.types";

import UserImage from "@/app/classroom/(components)/modal/comment/UserImage";
import timestampToDate from "@/utils/timestampToDate";
import UserInfo from "@/app/classroom/(components)/modal/comment/UserInfo";
import { Icon, Text } from "sfac-designkit-react";

interface LectureHeaderProps {
  lectureData: Lecture | undefined;
}

const LectureHeader: FC<LectureHeaderProps> = ({ lectureData }) => {
  const { title, user } = lectureData || {};
  const { profileImage, username, role } = user || {};
  const startDay = lectureData?.startDate
    ? timestampToDate(lectureData.startDate)
    : "";
  const endDay = lectureData?.endDate
    ? timestampToDate(lectureData.endDate)
    : "";

  return (
    <header className="flex border-b border-gray-200 w-full h-[135px]">
      <div className="w-1/12 h-full flex justify-center items-center">
        <Link href="/classroom" className="w-full pr-12 pb-14">
          <Icon
            name="Arrow"
            width={15}
            height={15}
            className="cursor-pointer float-right"
          />
        </Link>
      </div>
      <div className="w-11/12 h-full flex flex-col justify-center">
        {lectureData && (
          <>
            <div className="flex flex-col mb-1">
              <Text
                size="xl"
                weight="semibold"
                className="text-color-Grayscale-100 mb-2"
              >
                {title}
              </Text>
              <Text
                size="xs"
                weight="medium"
                className="text-color-Grayscale-100"
              >
                [수강기간]{startDay}~{endDay}
              </Text>
            </div>
            <div className="flex items-center mt-2">
              <UserImage profileImage={profileImage} />
              <UserInfo username={username} role={role} isHeader={true} />
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default LectureHeader;
