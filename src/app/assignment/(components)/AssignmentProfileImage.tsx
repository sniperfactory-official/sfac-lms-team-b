import Image from "next/image";

const AssignmentProfileImage = () => {
  return (
    <div>
      <div className="relative rounded-full overflow-hidden border border-grayscale-10 w-[43px] h-[43px]">
        <Image
          src="/images/img_dummy_200x200.webp"
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
