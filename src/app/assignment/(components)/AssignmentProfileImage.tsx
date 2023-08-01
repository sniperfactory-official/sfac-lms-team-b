import Image from "next/image";

const AssignmentProfileImage = (data: any) => {
  const defaultImagePath = "/images/avatar.svg"; // img src 없을 시 기본 이미지
  return (
    <div>
      <div className="relative rounded-full overflow-hidden border border-grayscale-10 w-[43px] h-[43px]">
        <Image
          src={data.images || defaultImagePath}
          alt="profile-img"
          width="0"
          height="0"
          sizes="100vw"
          className="w-full h-auto"
        />
      </div>
    </div>
  );
};

export default AssignmentProfileImage;
