"use client";

import React, { useEffect, useState } from "react";
import EmptyContents from "@/components/EmptyContents";
import AssignmentTeacherViewCard from "../(components)/AssignmentTeacherViewCard";
import { useParams } from "next/navigation";
import { useGetSubmittedAssignments } from "@/hooks/queries/useGetSubmittedAssignment";

const AssignmentTeacherViewCardWrapper: React.FC = () => {
  const [submittedData, setSubmittedData] = useState<any[]>([]);
  const { assignmentId } = useParams();
  const { data, isLoading, error } = useGetSubmittedAssignments(
    assignmentId as string,
  );

  useEffect(() => {
    setSubmittedData(data);
  }, [data]);

  return (
    <div>
      {isLoading ? null : (
        <div>
          {submittedData?.length > 0 ? (
            submittedData?.map(submittedItem => {
              return (
                <AssignmentTeacherViewCard
                  key={submittedItem.id}
                  submittedItem={submittedItem}
                  assignmentId={assignmentId as string}
                />
              );
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
