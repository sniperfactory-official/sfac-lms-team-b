"use client";

import React, { useEffect, useState } from "react";
import EmptyContents from "@/components/EmptyContents";
import AssignmentTeacherViewCard from "../(components)/AssignmentTeacherViewCard";
import { User } from "@/types/firebase.types";
import { useParams } from "next/navigation";
import { useGetSubmittedAssignments } from "@/hooks/queries/useGetSubmittedAssignment";
import LoadingSpinner from "@/components/Loading/Loading";

// interface OwnProps {
//   user: User;
// }

const AssignmentTeacherViewCardWrapper: React.FC = () => {
  const [submittedData, setSubmittedData] = useState<any[]>();

  const { assignmentId } = useParams();
  console.log("assignmentId:", assignmentId);
  const { data, isLoading, error } = useGetSubmittedAssignments(assignmentId); // FIXME: ts error

  console.log("data", data);

  useEffect(() => {
    setSubmittedData(data);
  }, [data]);

  return (
    <div>
      {isLoading ? null : (
        <div>
          {submittedData ? (
            submittedData?.map(item => {
              return <AssignmentTeacherViewCard key={item.id} item={item} />;
            })
          ) : (
            <EmptyContents emptyTxt="제출된 과제가 없습니다" />
          )}
        </div>
      )}
    </div>
  );
};

export default AssignmentTeacherViewCardWrapper;
