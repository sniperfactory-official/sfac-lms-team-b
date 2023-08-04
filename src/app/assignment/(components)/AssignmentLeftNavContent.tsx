"use client";

import React from "react";
import { useGetAssignment } from "@hooks/queries/useGetAssignment";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import AssignmentLeftNavBlock from "./AssignmentLeftNavContentCard";
import { useState, useEffect, useCallback, useRef } from "react";
import { AssignmentExtracted } from "./AssignmentLeftNavContentCard";
import { useUpdateAssignment } from "@/hooks/mutation/useUpdateAssignment";
import AssignmentLeftNavButton from "./AssignmentLeftNavContentButton";
import { useDeleteRegisteredAssignment } from "@/hooks/mutation/useDeleteRegisteredAssignment";
import { User } from "@/types/firebase.types";

type AssignmentExtractedOmitted = Omit<AssignmentExtracted, "movecard">;
export type AssignmentExtractedPicked = Pick<
  AssignmentExtracted,
  "id" | "order"
>; //id가 assignmentId인지 확인필요

const AssignmentLeftNavContent = prop => {
  const assignQueries = useGetAssignment("");
  const [htmlContent, setHtmlcontent] =
    useState<AssignmentExtractedOmitted[]>();
  const isLoading = assignQueries.isLoading;
  const initialHtml = useRef<AssignmentExtractedPicked[]>();
  const [isEditing, setIseiditing] = useState(false);

  //최초 로드시 데이터 fetch(데이터 POST 후의 로드는 고려하지 않음)
  const FetchAssignmentData = useCallback(() => {
    let htmlcontent = [];
    let initialHtml = [];

    if (isLoading === false) {
      const assignFetched = assignQueries.data;
      let index = assignFetched?.length;
      //order 순서대로 데이터 불러오기 및 추출(이후에는 moveCard로 순서보존)

      const assignSorted = assignFetched?.toSorted(
        (a: Object, b: Object) => a.order - b.order,
      );
      const length = assignSorted[assignSorted.length - 1].order;
      console.log(length);
      for (let i = 0; i < index; i++) {
        const assignCopied = assignSorted[i];
        let assignExtracted = {
          id: assignCopied.id,
          index: i,
          order: assignCopied.order,
          title: assignCopied.title,
        };
        htmlcontent.push(assignExtracted);
      }

      console.log(
        "[AssignmentLeftNavContent_FUNC] FetchAssignmentData 데이터 로드 완료!",
        htmlcontent,
      );
      setHtmlcontent(htmlcontent);
      initialHtml.current = [...htmlcontent];
    }
  }, [isLoading, assignQueries.data]);

  useEffect(() => {
    FetchAssignmentData();
  }, [FetchAssignmentData]);

  //index 서로 바꾸고 컴포넌트 리로드
  const moveCard = (dragIndex, hoverIndex) => {
    let htmlcontent = [...htmlContent];

    setHtmlcontent(prev => {
      htmlcontent.splice(dragIndex, 1, htmlcontent[hoverIndex]);
      htmlcontent.splice(hoverIndex, 1, prev[dragIndex]);
      return htmlcontent;
    });
  };

  const UpdateAssignmentOrder = () => {
    const assignOrderMutation = useUpdateAssignment(htmlContent);

    if (!assignOrderMutation.isLoading) {
      for (let i = 0; i < htmlContent?.length; i++) {
        let targetId = htmlContent[i].id; //현재 htmlcontent에서 id 추출
        assignOrderMutation.mutate(targetId);
      }
    }
  };

  const DeleteAssignment = (assignmentIdArray: string[]) => {
    const assignmentDelete = useDeleteRegisteredAssignment();
    if (!assignmentDelete.isLoading) {
      assignmentIdArray.forEach(assignId => {
        assignmentDelete.mutate(assignId);
      });
    }
  };

  const resetEditting = () => {
    setHtmlcontent(initialHtml);
    setIseiditing(false);
  };

  const startEditting = () => {
    setHtmlcontent(initialHtml);
    setIseiditing(true);
  };

  const modeExecuting = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(
      "[AssignmentLeftNavContent_FUNC] modeExecuting 실행!",
      event.target,
    );
    const formData = new FormData(event.target);
    console.log(formData.values());

    switch (formData.get("type")) {
      case "EDIT":
        console.log("edit!");
        startEditting();
        break;
      case "CHANGE":
        console.log("change!");
        //UpdateAssignmentOrder();
        break;
      case "DELETE":
        console.log("delete!");
        const targetId = formData.values();
        //DeleteAssignment(targetId);
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <DndProvider backend={HTML5Backend}>
        <form
          onSubmit={event => {
            modeExecuting(event);
          }}
          id="assign"
          name="assign"
        >
          {isLoading ? (
            <span>`none`</span>
          ) : (
            htmlContent?.map(assignExtracted => {
              return (
                <AssignmentLeftNavBlock
                  key={assignExtracted.id + "1"}
                  index={assignExtracted.index}
                  order={assignExtracted.order}
                  id={assignExtracted.id}
                  title={assignExtracted.title}
                  movecard={moveCard}
                  isEditing={isEditing}
                />
              );
            })
          )}
        </form>
      </DndProvider>
      <AssignmentLeftNavButton
        modeChanger={event => modeExecuting(event)}
        userInfo={prop.userId}
      />
    </div>
  );
};

export default AssignmentLeftNavContent;
