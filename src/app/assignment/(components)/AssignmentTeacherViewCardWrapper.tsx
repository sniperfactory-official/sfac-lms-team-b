import React from "react";
import EmptyContents from "@/components/EmptyContents";
import AssignmentTeacherViewCard from "../(components)/AssignmentTeacherViewCard";

const AssignmentTeacherViewCardWrapper = () => {
  return (
    <div>
      <div>
        {/* 제출된 과제 존재 유무에 따른 분기처리 필요 */}
        <EmptyContents emptyTxt="제출된 과제가 없습니다" />
        <AssignmentTeacherViewCard />
      </div>
    </div>
  );
};

export default AssignmentTeacherViewCardWrapper;
