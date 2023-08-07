"use client";

import React from "react";
import { useGetAssignment } from "@hooks/queries/useGetAssignment";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import AssignmentLeftNavCard from "./AssignmentLeftNavContentCard";
import { useState, useEffect, useCallback, useRef } from "react";
import { useUpdateAssignmentOrder } from "@/hooks/mutation/useUpdateAssignmentOrder";
import AssignmentLeftNavButton from "./AssignmentLeftNavContentButton";
import { useDeleteRegisteredAssignmentByAssignmentId } from "@/hooks/mutation/useDeleteRegisteredAssignmentByAssignmentId";
import { v4 as uuidv4 } from "uuid";
import { Assignment } from "@/types/firebase.types";

export interface AssignmentExtracted
  extends Pick<Assignment, "id" | "order" | "title"> {
  movecard: (dragIndex: Number, hoverIndex: Number) => void;
  index: number;
  isEditing?: boolean;
}
/* export type AssignmentExtractedorder = Pick<
  AssignmentExtracted,
  "id" | "order" 
>; //id가 assignmentId인지 확인필요 */

export interface Props {
  userInfo: Object;
  modeChanger: () => void;
}
const AssignmentLeftNavContent = (prop: Props) => {
  const assignQueries = useGetAssignment("");
  const assignOrderMutation = useUpdateAssignmentOrder();
  const assignDeletingMutation = useDeleteRegisteredAssignmentByAssignmentId();

  const isLoading = assignQueries.isLoading;
  const [isEditing, setIseiditing] = useState(false);

  const [htmlContent, setHtmlcontent] = useState<AssignmentExtracted[]>(); //현재 html(미정렬)
  const [htmlContentAligned, setHcAligned] = useState<AssignmentExtracted[]>(); //정렬된 데이터
  const initialHtml = useRef<AssignmentExtracted[]>(); //초기 html
  const editingCount = useRef(0);

  const alignAssignmentData = (htmlContent: AssignmentExtracted[]) => {
    
    const assignSorted = htmlContent?.toSorted(
      (a: AssignmentExtracted, b: AssignmentExtracted) => a.index - b.index,
      );
    setHcAligned(assignSorted);
  };

  const fetchAssignmentData = (assignQueriesdata) => {
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
        }
        htmlcontent.push(assignExtracted);
        initialhtml.push(initialAssign);
    }
    console.log(
      "[AssignmentLeftNavContent_FUNC] FetchAssignmentData 데이터 로드 완료!"
    );
    initialHtml.current = [...initialhtml]
    setHtmlcontent(htmlcontent);
  }

  useEffect(() => {
    //초기 데이터 fetch 및 추출
    if (isLoading === false) {
      fetchAssignmentData(assignQueries.data);
    }
  }, [isLoading, assignQueries.data]);

  useEffect(() => {
    //데이터 정렬
    console.log("데이터 정렬해요!");
    alignAssignmentData(htmlContent);
  }, [htmlContent]);

  /* #region  */
  //. 과제 변경 모듈
  //index 서로 바꾸고 컴포넌트 리로드
  const moveCard = (dragIndex:Number, hoverIndex:Number) => {
    editingCount.current += 1;
    setHtmlcontent((prev: AssignmentExtracted) => {
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
    if (!assignOrderMutation.isLoading && editingCount.current!==0) {
      console.log("실행!")
      editingCount.current=0;
      assignOrderMutation.mutate(htmlContentAligned);
    }
    setIseiditing(false)
  };

  const resetEditting = () => {
    setHtmlcontent(initialHtml.current);
    setIseiditing(false);
  };
  const StartEditting = () => {
    console.log("add!");
    setIseiditing(true);
  };

  const modeExecuting = event => {
    event.preventDefault();
    const formElem = event.target;
    let formData = new FormData();
    for (let k = 0; k < formElem.length; k++) {
      if(formElem[k].checked){
        const deleteTargetName = formElem[k].name;
        const deleteTargetValue = formElem[k].value;
        formData.set(deleteTargetName, deleteTargetValue);
      }
    }
    let deletingAssignmentId = [];
    if(!(formData.keys().length===0)){
      for (const key of formData.keys()) {
          deletingAssignmentId.push(key)
        };
      assignDeletingMutation.mutate(deletingAssignmentId);
      }
      editingCount.current=0
      setIseiditing(false);
    };
  /* #endregion */

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
            htmlContentAligned?.map((assignExtracted: AssignmentExtracted) => {
              console.log("데이터 맵핑 시작!");
              return (
                <AssignmentLeftNavCard
                  key={uuidv4()}
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
        modeChanger={StartEditting}
        userInfo={prop.userInfo}
        UpdateAssignmentOrder={UpdateAssignmentOrder}
        ResetEditting={resetEditting}
      />
    </div>
  );
};

export default AssignmentLeftNavContent;
