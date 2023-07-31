import Image from "next/image";

type OwnProps = {
  title: string;
  isOpen: boolean;
  isBottomButton: boolean;
  onClose: () => void;
  children: any; // any 괜찮은지 체크 필요
};

const AssignmentModal: React.FC<OwnProps> = ({
  title,
  isOpen,
  isBottomButton,
  onClose,
  children,
}) => {
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
          <h2 className="text-[20px] font-[700] text-grayscale-100">{title}</h2>
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
