"use client";

import React from "react";
import AssignmentStudentViewCard from "./AssignmentStudentViewCard";

const AssignmentTeacherViewCardWrapper = props => {
  const user = props.user;

  return (
    <div>
      <div>
        <AssignmentStudentViewCard />
      </div>
    </div>
  );
};

export default AssignmentTeacherViewCardWrapper;
