"use client";

import React from "react";
import { useGetAssignment } from "@hooks/queries/useGetAssignment";
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import AssignmentLeftNavBlock from './AssignmentLeftNavContentCard'
import {useState, useEffect, useCallback, useRef} from 'react'
import {AssignmentExtracted} from './AssignmentLeftNavContentCard'

type AssignmentExtractedOmitted = Omit<AssignmentExtracted, 'movecard'>

const AssignmentLeftNavContent = () => {
  const assignQueries = useGetAssignment("");
  const [htmlContent, setHtmlcontent] = useState<AssignmentExtractedOmitted[]>()
  const isLoading = assignQueries.isLoading
  console.log("[COMP]AssignmentLeftNavContent 실행!", htmlContent);
  console.log("isLoading:", isLoading);

  //최초 로드시 데이터 fetch(데이터 POST 후의 로드는 고려하지 않음)
  const FetchAssignmentData = useCallback(()=>{
    console.log("[COMP_FUNC]FetchAssignmentData 실행!", isLoading);
    let htmlcontent=[]

    if (isLoading === false) {
      console.log('데이터 로드!');
      const assignFetched = assignQueries.data;
      let index = assignFetched?.length; 
      //order 순서대로 데이터 불러오기 및 추출(이후에는 moveCard로 순서보존)

      for (let i=1; i<index; i++){
        let assignCopied = assignFetched?.find(assignAll=>assignAll.order===i);

        if (assignCopied!==undefined){ //order 있을경우에만 push
          let assignExtracted = {id:assignCopied.id, index: htmlcontent.length, order:assignCopied.order, title:assignCopied.title}
          htmlcontent.push(assignExtracted);
        }
      }
      console.log('데이터 로드 완료!', htmlcontent);
      setHtmlcontent(htmlcontent);
    }
  },[isLoading])

  useEffect(()=>{
    FetchAssignmentData()
  },[FetchAssignmentData]);

  //index 서로 바꾸고 컴포넌트 리로드
  const moveCard = (dragIndex, hoverIndex) => {
    console.log("[COMP_FUNC]moveCard 실행!");
    let htmlcontent = [...htmlContent]

    setHtmlcontent((prev)=>{
      htmlcontent.splice(dragIndex,1,htmlcontent[hoverIndex])
      htmlcontent.splice(hoverIndex,1,prev[dragIndex])
      return (htmlcontent)
    })
  };

    return (
      <DndProvider backend={HTML5Backend}>
        { isLoading?<span>`none`</span>:(htmlContent?.map((assignExtracted)=>{
          console.log('데이터 매핑 시작!', assignExtracted)
          return(
              <AssignmentLeftNavBlock key={Math.random()} index={assignExtracted.index} order={assignExtracted.order} id={assignExtracted.id} title={assignExtracted.title} movecard={moveCard}/>)}))
        }
      </DndProvider>
      );
  };

export default AssignmentLeftNavContent;
