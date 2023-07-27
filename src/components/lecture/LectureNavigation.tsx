import Image from "next/image";

const LectureNavigation = () => {
  return (
    <nav className="flex justify-between items-center p-10 h-24 text-gray-500">
      <button className="flex items-center cursor-pointer">
      <Image
          src="/images/backward-step.svg"
          alt="이전강의"
          width={20}
          height={20}
          className="cursor-pointer m-2"
        />
        <span className="text-sm m-2 ">이전강의</span>
      </button>
      <button className="flex items-center cursor-pointer">
        <Image
          src="/images/forward-step.svg"
          alt="다음강의"
          width={20}
          height={20}
          className="cursor-pointer m-2"
        />
        <span className="text-sm m-2">다음강의</span>
      </button>
    </nav>
  );
};

export default LectureNavigation;
