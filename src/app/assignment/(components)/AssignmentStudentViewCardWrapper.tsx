"use client";

import { FC } from "react";
import AssignmentStudentViewCard from "./AssignmentStudentViewCard";
import { User } from "@/types/firebase.types";
import { useParams } from "next/navigation";

interface OwnProps {
  user: User;
}

const AssignmentTeacherViewCardWrapper: FC<OwnProps> = ({ user }) => {
  const { assignmentId } = useParams();

  return (
    <div>
      <div>
        <AssignmentStudentViewCard user={user} assignmentId={assignmentId} />
      </div>
    </div>
  );
};

export default AssignmentTeacherViewCardWrapper;
