import Image from "next/image";
import Link from "next/link";
import AssignmentLeftNavContent from "./AssignmentLeftNavContent";


const AssignmentLeftNav = () => {
  console.log("[AssignmentLeftNav] 실행!"); 
  return (
    <div className="w-full flex flex-col items-center justify-start">
      <div className="w-full p-[13px] rounded-[10px] bg-[#f5f8ff] ">
        <Link href="/assignment">
          <Image
            className="inline align-middle mr-1"
            src="/images/icon_target.svg"
            alt="전체 과제 아이콘"
            width={19}
            height={19}
          />
          전체과제
        </Link>
      </div>
      <ul className="w-full">
        <AssignmentLeftNavContent />
      </ul>
    </div>
  );
};

export default AssignmentLeftNav;
