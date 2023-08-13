import React, { FC } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Icon } from "sfac-designkit-react";

interface NavigationButtonProps {
  lectureId: string | null | undefined;
  name: string;
  altText: string;
  buttonText: string;
  next?: string;
}

const NavigationButton: FC<NavigationButtonProps> = ({
  lectureId,
  name,
  altText,
  buttonText,
  next,
}) => {
  const router = useRouter();

  return (
    lectureId && (
      <button
        onClick={() => lectureId && router.push(`/classroom/${lectureId}`)}
        className="flex items-center cursor-pointer"
      >
        <Icon
          name="SkipNext"
          alt={altText}
          width={20}
          height={20}
          className={`cursor-pointer m-2 ${next}`}
        />
        <span className="text-sm m-2 ">{buttonText}</span>
      </button>
    )
  );
};

export default NavigationButton;
