import React, { FC } from "react";

import useGetPreAndNextLectureInfo from "@/hooks/queries/useGetPreAndNextLectureInfo";
import NavigationButton from "./NavigationButton";

interface LectureNavigationProps {
  lectureId: string;
}

const LectureNavigation: FC<LectureNavigationProps> = ({ lectureId }) => {
  const { data, isFetching, error } = useGetPreAndNextLectureInfo(lectureId);
  const { prevLectureId, nextLectureId } = data || {};

  console.log(data, isFetching, error);

  if (error instanceof Error) {
    return <div>Error: {error.message}</div>;
  }

  if (isFetching || !data) {
    return <div></div>
  }

  return (
    <nav className="flex justify-between items-center p-10 h-24 text-gray-500">
      {prevLectureId ? (
        <NavigationButton
          lectureId={prevLectureId}
          imageSrc="/images/backward-step.svg"
          altText="이전강의"
          buttonText="이전강의"
        />
      ) : (
        <div />
      )}

      {nextLectureId ? (
        <NavigationButton
          lectureId={nextLectureId}
          imageSrc="/images/forward-step.svg"
          altText="다음강의"
          buttonText="다음강의"
        />
      ) : (
        <div />
      )}
    </nav>
  );
};

export default LectureNavigation;
