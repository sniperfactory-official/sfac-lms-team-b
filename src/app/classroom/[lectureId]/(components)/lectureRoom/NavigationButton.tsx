import React, { FC } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface NavigationButtonProps {
  lectureId: string | null | undefined;
  imageSrc: string;
  altText: string;
  buttonText: string;
}

const NavigationButton: FC<NavigationButtonProps> = ({
  lectureId,
  imageSrc,
  altText,
  buttonText,
}) => {
  const router = useRouter();

  return (
    lectureId && (
      <button
        onClick={() => lectureId && router.push(`/classroom/${lectureId}`)}
        className="flex items-center cursor-pointer"
      >
        <Image
          src={imageSrc}
          alt={altText}
          width={20}
          height={20}
          className="cursor-pointer m-2"
        />
        <span className="text-sm m-2 ">{buttonText}</span>
      </button>
    )
  );
};

export default NavigationButton;
