"use client";

import React from "react";
import { useGetAssignment } from "@hooks/queries/useGetAssignment";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import AssignmentLeftNavBlock from "./AssignmentLeftNavContentCard";
import { useState, useEffect, useCallback, useRef } from "react";
import { AssignmentExtracted } from "./AssignmentLeftNavContentCard";
import { writeBatch, doc } from "firebase/firestore";
import { db } from "@utils/firebase";

type AssignmentExtractedOmitted = Omit<AssignmentExtracted, "movecard">;
type AssignmentExtractedPicked = Pick<AssignmentExtracted, "id" | "order">; //id가 assignmentId인지 확인필요

const AssignmentLeftNavContent = () => {
  const assignQueries = useGetAssignment("");
  const [htmlContent, setHtmlcontent] =
    useState<AssignmentExtractedOmitted[]>();
  const isLoading = assignQueries.isLoading;
  const initialOrder = useRef<AssignmentExtractedPicked[]>();

  //최초 로드시 데이터 fetch(데이터 POST 후의 로드는 고려하지 않음)
  const FetchAssignmentData = useCallback(() => {
    let htmlcontent = [];
    let initialorder = [];

    if (isLoading === false) {
      const assignFetched = assignQueries.data;
      let index = assignFetched?.length;
      //order 순서대로 데이터 불러오기 및 추출(이후에는 moveCard로 순서보존)

      for (let i = 1; i < index; i++) {
        let assignCopied = assignFetched?.find(
          assignAll => assignAll.order === i,
        );

        if (assignCopied !== undefined) {
          //order 있을경우에만 push
          let assignExtracted = {
            id: assignCopied.id,
            index: htmlcontent.length,
            order: assignCopied.order,
            title: assignCopied.title,
          };
          let orderExtracted = {
            id: assignCopied.id,
            order: assignCopied.order,
          };
          htmlcontent.push(assignExtracted);
          initialorder.push(orderExtracted);
        }
      }
      console.log("데이터 로드 완료!", htmlcontent);
      setHtmlcontent(htmlcontent);
      initialOrder.current = initialorder;
    }
  }, [isLoading]);

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

  const UpdateAssignmentOrder = async () => {
    //? transaction(batch)으로 일괄처리하는게 좋을 듯합니다.
    const batch = writeBatch(db);

    for (let i = 0; i < htmlContent?.length; i++) {
      let targetId = htmlContent[i].id; //현재 htmlcontent에서 id 추출
      let targetDat = initialOrder.filter(data => data.id === targetId); //해당 id로 initialOrder의 order 값 추출
      let newOrder = targetDat.order;
      const assignRef = doc(db, "assignment", targetId);
      batch.update(assignRef, { order: newOrder }); //updateDoc
    }

    await batch.commit(); //commit
  };

  return (
    <DndProvider backend={HTML5Backend}>
      {isLoading ? (
        <span>`none`</span>
      ) : (
        htmlContent?.map(assignExtracted => {
          console.log("데이터 매핑 시작!", assignExtracted);
          return (
            <AssignmentLeftNavBlock
              key={assignExtracted.id}
              index={assignExtracted.index}
              order={assignExtracted.order}
              id={assignExtracted.id}
              title={assignExtracted.title}
              movecard={moveCard}
            />
          );
        })
      )}
    </DndProvider>
  );
};

export default AssignmentLeftNavContent;
