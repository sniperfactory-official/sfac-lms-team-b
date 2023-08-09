import Image from "next/image";
import { SyntheticEvent } from "react";
interface OwnProps {
  profileImage: string | undefined;
}

const AssignmentProfileImage: React.FC<OwnProps> = profileImage => {
  const defaultImagePath = "/images/avatar.svg";

  const handleError = (event: SyntheticEvent<HTMLImageElement, Event>) => {
    const imgElement = event.currentTarget as HTMLImageElement;
    imgElement.src = defaultImagePath; //img src 없을 시 기본 이미지
  };

  return (
    <div>
      <div className="relative rounded-full overflow-hidden border border-grayscale-10 w-[43px] h-[43px]">
        {profileImage && (
          <Image
            src={`${profileImage.profileImage} || ${defaultImagePath}`}
            alt="profile-img"
            width="0"
            height="0"
            sizes="100vw"
            className="w-full h-full"
            onError={handleError}
          />
        )}
      </div>
    </div>
  );
};

export default AssignmentProfileImage;