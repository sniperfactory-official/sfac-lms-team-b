import Image from "next/image";
import thumnail from "../../../../../public/images/thumnail.png";

const ContentImg = ({ isPrivate }: { isPrivate: boolean }) => {
  return (
    <div className="w-1/3 h-5/6 rounded-lg mr-[25px] relative justify-center items-center flex">
      <Image
        src={thumnail}
        alt="thumnail"
        placeholder="blur"
        className="absolute left-[0px] top-[0px] w-full h-full"
      />
      {isPrivate && (
        <>
          <div className="absolute left-[0px] top-[0px] bg-gray-600 w-full h-full rounded-lg opacity-40 flex justify-center items-center"></div>
          <Image
            src="/images/private.svg"
            alt="비공개 강의"
            width={50}
            height={50}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          />
        </>
      )}
    </div>
  );
};

export default ContentImg;
