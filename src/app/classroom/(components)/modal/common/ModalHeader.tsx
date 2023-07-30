import { ReactNode } from "react";

interface ModalHeaderProps {
  children?: ReactNode;
  currentModalName: string;
}

const ModalHeader: React.FC<ModalHeaderProps> = ({
  children,
  currentModalName,
}) => {
  return (
    <div className="flex gap-[10px] text-xl font-bold text-grayscale-100">
      {children}
      {children ? (
        <span className="relative pl-[17px] before:absolute before:top-[9px] before:left-0 before:w-[7px] before:h-[11px] before:bg-[url('/images/arrowRight.svg')] before:bg-no-repeat before:bg-contain">
          {currentModalName}
        </span>
      ) : (
        <span>{currentModalName}</span>
      )}
    </div>
  );
};

export default ModalHeader;
