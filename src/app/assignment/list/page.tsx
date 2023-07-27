import React from "react";

//.0726 : 기본 레이아웃 설정
const List = () => {
  return (
    <div>
      <div className="wrap float-left w-[775px] h-[87px] flex-shrink-0 border-radius-[10px] mb-[20px] border border-grayscale-5 bg-grayscale-0 flex justify-between items-center px-[24px]">
        <div className="left flex w-[244px] flex-col items-start gap-[10px]">
          <div className="tag inline-flex p-[4px] px-[10px] justify-center items-center gap-[8px] rounded-[4px] bg-grayscale-5">
            중
          </div>
          <div className="title text-grayscale-80 font-bold text-[16px]">
            ListTile 커스텀 위젯 만들기
          </div>
        </div>
        <button className="btn w-[157px] h-[35px] p-[9px] gap-[10px] flex justify-center items-center flex-shrink-0 rounded-[10px] bg-primary-80 border-none">
          확인하기
        </button>
      </div>
      <div className="wrap float-left w-[775px] h-[87px] flex-shrink-0 border-radius-[10px] mb-[20px] border border-grayscale-5 bg-grayscale-0 flex justify-between items-center px-[24px]">
        <div className="left flex w-[244px] flex-col items-start gap-[10px]">
          <div className="tag inline-flex p-[4px] px-[10px] justify-center items-center gap-[8px] rounded-[4px] bg-grayscale-5">
            중
          </div>
          <div className="title text-grayscale-80 font-bold text-[16px]">
            ListTile 커스텀 위젯 만들기
          </div>
        </div>
        <button className="btn w-[157px] h-[35px] p-[9px] gap-[10px] flex justify-center items-center flex-shrink-0 rounded-[10px] bg-primary-80 border-none">
          확인하기
        </button>
      </div>
      <div className="wrap float-left w-[775px] h-[87px] flex-shrink-0 border-radius-[10px] mb-[20px] border border-grayscale-5 bg-grayscale-0 flex justify-between items-center px-[24px]">
        <div className="left flex w-[244px] flex-col items-start gap-[10px]">
          <div className="tag inline-flex p-[4px] px-[10px] justify-center items-center gap-[8px] rounded-[4px] bg-grayscale-5">
            중
          </div>
          <div className="title text-grayscale-80 font-bold text-[16px]">
            ListTile 커스텀 위젯 만들기
          </div>
        </div>
        <button className="btn w-[157px] h-[35px] p-[9px] gap-[10px] flex justify-center items-center flex-shrink-0 rounded-[10px] bg-primary-80 border-none">
          확인하기
        </button>
      </div>
    </div>
  );
};

export default List;
