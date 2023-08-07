"use client";

import React from "react";
import { useGetAssignment } from "@hooks/queries/useGetAssignment";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import AssignmentLeftNavCard from "./AssignmentLeftNavContentCard";
import { useState, useEffect, useCallback, useRef } from "react";
import { useUpdateAssignment } from "@/hooks/mutation/useUpdateAssignment";
import AssignmentLeftNavButton from "./AssignmentLeftNavContentButton";
import { useDeleteRegisteredAssignment } from "@/hooks/mutation/useDeleteRegisteredAssignment";
import { v4 as uuidv4 } from 'uuid';
import { Assignment } from "@/types/firebase.types";


export interface AssignmentExtracted
  extends Pick<Assignment, "id" | "order" | "title"> {
  movecard: (dragIndex: Number, hoverIndex: Number) => void;
  index: number;
  isEditing? : boolean;

}
/* export type AssignmentExtractedorder = Pick<
  AssignmentExtracted,
  "id" | "order" 
>; //id가 assignmentId인지 확인필요 */

export interface Props {
  userInfo: Object;
  modeChanger: (arg: Event) => void;
}
const AssignmentLeftNavContent = (prop:Props) => {
  const assignQueries = useGetAssignment("");
  const isLoading = assignQueries.isLoading;
  const [isEditing, setIseiditing] = useState(false);

  const [htmlContent, setHtmlcontent] = useState<AssignmentExtracted[]>(); //현재 html(미정렬)
  const [htmlContentAligned,setHcAligned] = useState<AssignmentExtracted[]>(); //정렬된 데이터
  const initialHtml = useRef<AssignmentExtracted[]>(); //초기 html 
  

  const alignAssignmentData = (htmlContentAligned:AssignmentExtracted[]) => {
    const assignSorted = htmlContentAligned?.toSorted(
      (a:AssignmentExtracted, b:AssignmentExtracted) => a.order - b.order
    );
    setHcAligned(assignSorted);
}

  useEffect(() => { //초기 데이터 fetch 및 추출
    if (isLoading === false) {
      let htmlcontent = [];
      console.log("[AssignmentLeftNavContent_FUNC] FetchAssignmentData 데이터 로드 완료!");
      const assignFetched = assignQueries.data;
      let index = assignFetched?.length;

      //order 순서대로 데이터 불러오기 및 추출(이후에는 moveCard로 순서보존)
      for (let i = 0; i < index; i++) {
        const assignCopied = assignFetched[i];
        let assignExtracted = {
          id: assignCopied.id,
          index: i,
          order: assignCopied.order,
          title: assignCopied.title,
        };
        htmlcontent.push(assignExtracted);
      }
      setHtmlcontent(htmlcontent)
      initialHtml.current = [...htmlcontent]; //정렬된 데이터 설정(setHmltcontent는 생략)
    }
  }, [isLoading]);

  useEffect(() => { //데이터 정렬
    console.log("데이터 정렬해요!");
    alignAssignmentData(htmlContent);

  }, [htmlContent]);

 /* #region  */
  //. 과제 변경 모듈
  //index 서로 바꾸고 컴포넌트 리로드
  const moveCard = (dragIndex, hoverIndex) => {
    setHtmlcontent((prev:AssignmentExtracted)=>{
      let hcSpliced =  prev.toSpliced(dragIndex, 1, prev[hoverIndex]); //dragIndex에 hoverIndex 자리의 값이 들어감
      let hcDoubleSpliced = hcSpliced.toSpliced(hoverIndex, 1, prev[dragIndex])
      hcDoubleSpliced[dragIndex].order = prev[dragIndex].order;
      hcDoubleSpliced[dragIndex].index = dragIndex;
      hcDoubleSpliced[hoverIndex].order = prev[hoverIndex].order;
      hcDoubleSpliced[hoverIndex].index = hoverIndex;
      return hcDoubleSpliced;
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


  const handleKeyPress = (event) => {
    console.log(event)
    if (event.key==="Escape") {
      setIseiditing(false);
      window.removeEventListener('keypress', handleKeyPress);
    }
  }

  const StartEditting = () => {
    console.log("add!")
    setIseiditing(true);
    //window.addEventListener('keypress', handleKeyPress);
  };

  

  const modeExecuting = (event) => {
    console.log(event.target)
    event.preventDefault();
    const formElem = event.target;
    let formData = new FormData()
    for (let k=0; k<formElem.length; k++){
      const deleteTargetName = formElem[k].name;
      const deleteTargetValue = formElem[k].value;
      formData.set(deleteTargetName,deleteTargetValue);
    }
    // Display the values
    for (const value of formData.values()) {
      console.log(value);
    }
    
  }
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
            htmlContentAligned?.map((assignExtracted:AssignmentExtracted) => {
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
      />
    </div>
    );
  }

export default AssignmentLeftNavContent;
