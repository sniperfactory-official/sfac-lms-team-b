'use client'

//. 0728 ReactQuery로 데이터 불러오기
import React from 'react'
import {useGetAssignment} from '../../../hooks/queries/useGetAssignment'
import {
  DocumentData,
} from "firebase/firestore";
import { Assignment } from '@/types/firebase.types';
import Link from "next/link";

interface Assignment2 extends Assignment{
  assignmentNumber: number; 
}

const ListContent = () => {
  const assignDat = useGetAssignment('')
  let cont
  if (assignDat.isLoading===false){
    //_데이터 정의
    const assignment = assignDat.data
    console.log(assignment)
    //_매핑
    cont = assignment?.map((assign:Assignment2)=>(
      <div key={assign.assignmentNumber} className="wrap w-[775px] h-[87px] flex-shrink-0 border-radius-[10px] mb-[20px] border border-grayscale-5 bg-grayscale-0 flex justify-between items-center px-[24px]">
        <div className="left flex w-[244px] flex-col items-start gap-[10px]">
          <div className="tag inline-flex p-[4px] px-[10px] justify-center items-center gap-[8px] rounded-[4px] bg-grayscale-5">{assign.level}</div>
          <div className="title text-grayscale-80 font-bold text-[16px]">{assign.title}</div>
        </div>
          <Link href={"/assignment/detail/"+assign.assignmentNumber} type="button" className="btn w-[157px] h-[35px] p-[9px] gap-[10px] flex justify-center items-center flex-shrink-0 rounded-[10px] bg-primary-80 border-none">확인하기</Link>
      </div>
    ))
   }
  return(
    <div>
      {cont}
    </div>
  )
}

export default ListContent