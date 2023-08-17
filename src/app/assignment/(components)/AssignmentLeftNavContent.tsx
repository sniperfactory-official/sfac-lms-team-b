"use client";

import React, { useState, useEffect, useRef } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { v4 as uuidv4 } from "uuid";
import { useGetAssignment } from "@hooks/queries/useGetAssignment";
import { useUpdateAssignmentOrder } from "@/hooks/mutation/useUpdateAssignmentOrder";
import { useDeleteRegisteredAssignmentByAssignmentId } from "@/hooks/mutation/useDeleteRegisteredAssignmentByAssignmentId";
import { Assignment } from "@/types/firebase.types";
import { User } from "@/types/firebase.types";
import AssignmentLeftNavCard from "./AssignmentLeftNavContentCard";
import AssignmentLeftNavButton from "./AssignmentLeftNavContentButton";

export interface AssignmentExtracted
  extends Pick<Assignment, "id" | "order" | "title"> {
  index: number;
}

interface Props {
  userInfo: User;
}

const AssignmentLeftNavContent = (props: Props) => {
  const assignQueries = useGetAssignment("");
  const assignOrderMutation = useUpdateAssignmentOrder();
  const assignDeletingMutation = useDeleteRegisteredAssignmentByAssignmentId();
  const isLoading = assignQueries.isLoading;
  const [isEditting, setIsEditting] = useState(false);
  const [htmlContent, setHtmlcontent] = useState<AssignmentExtracted[]>();
  const [htmlContentAligned, setHcAligned] = useState<AssignmentExtracted[]>();
  const editingCount = useRef(0);
  const navContentRef = useRef<any>();

  const fetchAssignmentData = (assignQueriesdata: Assignment[]) => {
    let htmlcontent = [];
    const assignFetched = assignQueriesdata;
    let len = assignFetched?.length;

    for (let i = 0; i < len; i++) {
      const assignCopied = assignFetched[i];
      let assignExtracted = {
        id: assignCopied.id,
        index: i,
        order: assignCopied.order,
        title: assignCopied.title,
      };
      htmlcontent.push(assignExtracted);
    }
    setHtmlcontent(htmlcontent);
  };

  const alignAssignmentData = (htmlContent: AssignmentExtracted[]) => {
    const assignSorted = htmlContent?.sort(
      (a: AssignmentExtracted, b: AssignmentExtracted) => a.index - b.index,
    );
    setHcAligned((prev: any) => {
      if (prev) {
        const updatedCount = assignSorted.length - prev.length;
        if (prev.length !== assignSorted.length) {
          navContentRef.current.scrollTop =
            navContentRef.current.scrollHeight + updatedCount * 40;
        }
      }
      return assignSorted;
    });
  };

  useEffect(() => {
    if (isLoading === false) {
      fetchAssignmentData(assignQueries.data as Assignment[]);
    }
  }, [isLoading, assignQueries.data]);

  useEffect(() => {
    alignAssignmentData(htmlContent as AssignmentExtracted[]);
  }, [htmlContent]);

  const StartEditting = () => {
    setIsEditting(true);
  };

  const moveCard = (dragIndex: number, hoverIndex: number) => {
    editingCount.current += 1;
    setHtmlcontent((prev: any) => {
      let hcSpliced = prev.toSpliced(dragIndex, 1, prev[hoverIndex]);
      let hcDoubleSpliced = hcSpliced.toSpliced(hoverIndex, 1, prev[dragIndex]);
      hcDoubleSpliced[dragIndex].index = dragIndex;
      hcDoubleSpliced[hoverIndex].index = hoverIndex;
      return hcDoubleSpliced;
    });
  };

  const UpdateAssignmentOrder = () => {
    if (!assignOrderMutation.isLoading && editingCount.current !== 0) {
      editingCount.current = 0;
      assignOrderMutation.mutate(htmlContentAligned as AssignmentExtracted[]);
    }
    setIsEditting(false);
  };

  const resetEditting = () => {
    editingCount.current = 0;
    fetchAssignmentData(assignQueries.data as Assignment[]);
    setIsEditting(false);
  };

  const deleteAssignmentElems = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formElem = event.target as HTMLElement;
    const length = formElem.childElementCount;
    const formArray = Array(event.target) as Array<any>;
    let formData = new FormData() as FormData;

    for (let len = 0; len < length; len++) {
      if (formArray[0][len].checked === true) {
        const deleteTargetName = formArray[0][len].name;
        const deleteTargetValue = formArray[0][len].value;
        formData.set(deleteTargetName, deleteTargetValue);
      }
    }
    let deletingAssignmentId = [];
    const formKeys = Array.from(formData.keys());
    for (const key of formKeys) {
      deletingAssignmentId.push(key);
    }
    assignDeletingMutation.mutate(deletingAssignmentId);
    editingCount.current = 0;
    setIsEditting(false);
  };

  return (
    <div>
      <DndProvider backend={HTML5Backend}>
        <div ref={navContentRef} className="max-h-[412px] overflow-y-scroll">
          <form
            onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
              deleteAssignmentElems(event);
            }}
            id="assign"
            name="assign"
          >
            {isLoading
              ? ""
              : htmlContentAligned?.map(
                  (assignExtracted: AssignmentExtracted) => {
                    return (
                      <AssignmentLeftNavCard
                        key={uuidv4()}
                        index={assignExtracted.index}
                        order={assignExtracted.order}
                        id={assignExtracted.id}
                        title={assignExtracted.title}
                        movecard={moveCard}
                        isEditting={isEditting}
                      />
                    );
                  },
                )}
          </form>
        </div>
      </DndProvider>
      <AssignmentLeftNavButton
        modeChanger={StartEditting}
        userInfo={props.userInfo}
        UpdateAssignmentOrder={UpdateAssignmentOrder}
        ResetEditting={resetEditting}
      />
    </div>
  );
};

export default AssignmentLeftNavContent;
