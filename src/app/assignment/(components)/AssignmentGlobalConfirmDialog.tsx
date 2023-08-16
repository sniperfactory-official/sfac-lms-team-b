import { useEffect } from "react";
import { Button, Title } from "sfac-designkit-react";

type tAssignmentGlobalConfirmDialogProps = {
  onConfirm: () => void;
  onCancel: () => void;
  isOpen: boolean;
  title: string; // 모달 타이틀
  confirmBtnMsg: string; // 컨펌 확인 버튼 글자
  confirmFormId?: string; // 컨펌 확인 버튼에 form id 필요 시 작성
};

const AssignmentGlobalConfirmDialog = ({
  onConfirm,
  onCancel,
  isOpen,
  title,
  confirmBtnMsg,
  confirmFormId,
}: tAssignmentGlobalConfirmDialogProps) => {
  useEffect(() => {
    isOpen
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "visible");
  }, [isOpen]);

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
            <Title
              size="xl"
              className="text-center text-grayscale-100 text-color-Grayscale-100"
            >
              {title}
            </Title>
            <div className="flex justify-center item-center gap-[8px]">
              <Button
                className="min-w-[115px]"
                variant="secondary"
                text="취소"
                asChild
                onClick={onCancel}
              />
              <Button
                type="submit"
                className="min-w-[115px]"
                variant="destructive"
                text={confirmBtnMsg}
                asChild
                onClick={onConfirm}
                form={confirmFormId}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AssignmentGlobalConfirmDialog;
