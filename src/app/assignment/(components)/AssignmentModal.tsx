import Image from "next/image";
import { ReactNode, useEffect } from "react";
import { Title } from "sfac-designkit-react";

type TAssignmentModalProps = {
  title: string;
  isOpen: boolean;
  isBottomButton: boolean;
  onClose: () => void;
  children: ReactNode;
};

const AssignmentModal = ({
  title,
  isOpen,
  isBottomButton,
  onClose,
  children,
}: TAssignmentModalProps) => {
  useEffect(() => {
    isOpen
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "visible");
  }, [isOpen]);

  return (
    <div
      className={`fixed w-screen h-screen z-50 left-0 top-0 flex justify-center items-center transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        className="w-full h-full bg-black absolute opacity-30"
        onClick={onClose}
      />
      <div
        className={`modal relative z-1 bg-white p-[33px_0] rounded-[10px] max-w-[775px] w-11/12 shadow-24dp h-[80vh] ${
          isBottomButton ? "pb-[97px]" : null
        }`}
      >
        <div className="flex justify-between items-center mb-[20px] px-[33px]">
          <Title
            size="xl"
            className="text-grayscale-100 text-color-Grayscale-100"
          >
            {title}
          </Title>
          <button className="w-[24px] h-[24px]" type="button" onClick={onClose}>
            <Image
              src="/images/close.svg"
              alt="닫기"
              width="0"
              height="0"
              className="w-full h-full"
            />
          </button>
        </div>

        <div
          className="px-[33px] overflow-y-auto"
          style={{
            height: "calc(100% - 60px)",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default AssignmentModal;
