import { ReactNode } from "react";

type OwnProps = {
  onCancel: () => void;
  isOpen: boolean;
  title: string;
  children: ReactNode;
};

const AssignmentGlobalConfirmPopup: React.FC<OwnProps> = ({
  onCancel,
  isOpen,
  title,
  children,
}) => {
  return (
    <>
      <div
        className={`fixed w-screen h-screen z-50 left-0 top-0 flex justify-center items-center transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="w-full h-full bg-black absolute opacity-30"
          onClick={onCancel}
        />
        <div
          className={`modal relative z-1 bg-white p-[10px] rounded-[10px] max-w-[80vw] w-[477px] shadow-24dp h-[168px]`}
        >
          <div className="h-full flex flex-col justify-center gap-[27px]">
            <h2 className="text-[20px] font-[700] text-grayscale-100 text-center">
              {title}
            </h2>
            <div className="flex justify-center item-center gap-[8px]">
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AssignmentGlobalConfirmPopup;
