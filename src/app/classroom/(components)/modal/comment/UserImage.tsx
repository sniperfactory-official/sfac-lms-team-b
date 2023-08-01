import React, { FC, useState, useEffect } from "react";
import Image from "next/image";
import { getProfileImageURL } from "@/hooks/lecture/useProfileImageURL";

interface UserImageProps {
  profileImage: string;
  size?: "default" | "large";
}

const UserImage: FC<UserImageProps> = ({ profileImage, size = "default" }) => {
  const [profileImageURL, setProfileImageURL] = useState<string | null>(null);

  useEffect(() => {
    getProfileImageURL(profileImage)
      .then(setProfileImageURL)
      .catch(console.error);
  }, [profileImage]);

  const wrapperClass = size === "default" ? "w-7 h-7" : "w-10 h-10";

  return profileImageURL ? (
    <div className={`${wrapperClass} relative rounded-full flex-shrink-0`}>
      <Image
        src={profileImageURL}
        alt="사용자 이미지"
        layout="fill"
        objectFit="cover"
        className="rounded-full"
      />
    </div>
  ) : (
    <div
      className={`${wrapperClass} bg-white border border-gray-300 rounded-full flex-shrink-0`}
    ></div>
  );
};

export default UserImage;
