import { IContent } from "./MOCK_DATA";

const ContentCard = ({ props }: { props: IContent }) => {
  return (
    <div className="w-[775px] h-[200px] border rounded-lg p-[10px] flex flex-row items-center mb-[15px]">
      <div className="w-1/3 h-5/6 bg-primary-40 rounded-lg mr-[25px]">
        img section
      </div>
      <div className="w-2/3 h-5/6 ml-20px flex flex-col">
        <div className="text-xs ml-auto flex items-center w-[60px] text-grayscale-100 justify-around text-[12px]">
          <button className="text-xs">수정</button>
          <div className="w-[0.5px] h-3 border-[0.5px] border-black"></div>
          <button className="text-xs">삭제</button>
        </div>
        <div className="bg-grayscale-5 rounded w-[40px] h-[20px] text-xs text-center leading-[20px] mb-[10px] text-grayscale-60">
          {props.RUN_TIME}분
        </div>
        <div className="font-bold mb-[10px]">{props.TITLE}</div>
        <div className="flex flex-row justify-between mt-[20px]">
          <div className="flex flex-col">
            <div className="text-xs">[수강기간]</div>
            <div className="text-xs">{props.CLASS_DATE}</div>
          </div>
          <button className="w-[140px] h-[35px] bg-grayscale-5 text-center leading-[35px] text-sm rounded-lg">
            수강하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContentCard;