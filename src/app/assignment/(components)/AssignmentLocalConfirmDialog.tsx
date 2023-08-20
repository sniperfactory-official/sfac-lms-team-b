import { Button, Text } from "sfac-designkit-react";

type TAssignmentLocalConfirmDialogProps = {
  onConfirm: () => void;
  onCancel: () => void;
  isOpen: boolean;
  title: string; // 모달 타이틀
  content: string; // 모달 설명
  confirmBtnMsg: string; // 컨펌 확인 버튼 글자
};

const AssignmentLocalConfirmDialog = ({
  onConfirm,
  onCancel,
  isOpen,
  title,
  content,
  confirmBtnMsg,
}: TAssignmentLocalConfirmDialogProps) => {
  return (
    <>
      <div
        className={`absolute z-50 left-[24px] bottom-[30px] transition-opacity duration-300 shadow-24dp w-[420px] h-[155px] rounded-[10px] p-[18px_21px] bg-white ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <Text
          size="sm"
          weight="bold"
          className="text-grayscale-80 text-color-Grayscale-80 mb-[15px] block"
        >
          {title}
        </Text>
        <Text
          size="xs"
          weight="semibold"
          className="text-grayscale-80 text-color-Grayscale-80 mb-[16px] block"
        >
          {content}
        </Text>
        <div className="flex justify-end item-center gap-[8px]">
          <Button variant="secondary" text="취소" asChild onClick={onCancel} />
          <Button
            variant="primary"
            text={confirmBtnMsg}
            asChild
            onClick={onConfirm}
          />
        </div>
      </div>
    </>
  );
};

export default AssignmentLocalConfirmDialog;
