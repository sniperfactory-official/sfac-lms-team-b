"use client";

import React from "react";
import { DndProvider } from "react-dnd";
import { v4 as uuidv4 } from "uuid";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useState, useEffect, useRef } from "react";
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
  const [htmlContent, setHtmlcontent] = useState<AssignmentExtracted[]>(); //현재 html(미정렬)
  const [htmlContentAligned, setHcAligned] = useState<AssignmentExtracted[]>(); //정렬된 데이터
  const initialHtml = useRef<AssignmentExtracted[]>(); //초기 html
  const editingCount = useRef(0);

  const alignAssignmentData = (htmlContent: AssignmentExtracted[]) => {
    const assignSorted = htmlContent?.sort(
      (a: AssignmentExtracted, b: AssignmentExtracted) => a.index - b.index,
    );
    setHcAligned(assignSorted);
  };

  const fetchAssignmentData = (assignQueriesdata: Assignment[]) => {
    let htmlcontent = [];
    let initialhtml = [];
    const assignFetched = assignQueriesdata;
    let len = assignFetched?.length;

    //order 순서대로 데이터 불러오기 및 추출(이후에는 moveCard로 순서보존)
    for (let i = 0; i < len; i++) {
      const assignCopied = assignFetched[i];
      let assignExtracted = {
        id: assignCopied.id,
        index: i,
        order: assignCopied.order,
        title: assignCopied.title,
      };
      let initialAssign = {
        id: assignCopied.id,
        index: i,
        order: assignCopied.order,
        title: assignCopied.title,
      };
      htmlcontent.push(assignExtracted);
      initialhtml.push(initialAssign);
    }
    initialHtml.current = [...initialhtml];
    setHtmlcontent(htmlcontent);
  };

  useEffect(() => {
    //초기 데이터 fetch 및 추출
    if (isLoading === false) {
      fetchAssignmentData(assignQueries.data as Assignment[]);
    }
  }, [isLoading, assignQueries.data]);

  useEffect(() => {
    //데이터 정렬
    alignAssignmentData(htmlContent as AssignmentExtracted[]);
  }, [htmlContent]);

  //index 서로 바꾸고 컴포넌트 리로드
  const moveCard = (dragIndex: number, hoverIndex: number) => {
    editingCount.current += 1;
    setHtmlcontent((prev: any) => {
      let hcSpliced = prev.toSpliced(dragIndex, 1, prev[hoverIndex]); //dragIndex에 hoverIndex 자리의 값이 들어감
      let hcDoubleSpliced = hcSpliced.toSpliced(hoverIndex, 1, prev[dragIndex]);
      hcDoubleSpliced[dragIndex].order = prev[dragIndex].order;
      hcDoubleSpliced[dragIndex].index = dragIndex;
      hcDoubleSpliced[hoverIndex].order = prev[hoverIndex].order;
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
    setHtmlcontent(initialHtml.current);
    setIsEditting(false);
  };

  const StartEditting = () => {
    setIsEditting(true);
  };

  const deleteAssignmentElems = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formElem = event.target as HTMLElement;
    const length = formElem.childElementCount;

    let formData = new FormData() as FormData;
    const formArray = Array(event.target) as Array<any>;
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
        <form
          onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
            deleteAssignmentElems(event);
          }}
          id="assign"
          name="assign"
        >
          {isLoading ? (
            <span>`none`</span>
          ) : (
            htmlContentAligned?.map((assignExtracted: AssignmentExtracted) => {
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
            })
          )}
          00
        </form>
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
