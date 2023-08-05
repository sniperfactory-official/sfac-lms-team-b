import { UseMutateFunction } from "@tanstack/react-query";

type OwnProps = {
  onConfirm: () => void;
  onCancel: () => void;
  isOpen: boolean;
  title: string; // 모달 타이틀
  content: string; // 모달 설명
  confirmBtnMsg: string; // 컨펌 확인 버튼 글자
  feedbackId: string;
  mutate: UseMutateFunction<void, unknown, void, unknown>;
  setToastMsg: React.Dispatch<React.SetStateAction<string>>;
};

const AssignmentLocalConfirmDialog: React.FC<OwnProps> = ({
  onConfirm,
  onCancel,
  isOpen,
  title,
  content,
  confirmBtnMsg,
  feedbackId,
  mutate,
  setToastMsg,
}) => {
  return (
    <>
      <div
        className={`absolute z-50 left-[24px] bottom-[30px] transition-opacity duration-300 shadow-24dp w-[420px] h-[155px] rounded-[10px] p-[18px_21px] bg-white ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <h4 className="mb-[15px] text-[14px] font-[700] text-grayscale-80">
          {title}
        </h4>
        <p className="text-[12px] font-[500] text-grayscale-80 mb-[16px]">
          {content}
        </p>
        <div className="flex justify-end item-center gap-[8px]">
          <button
            className="w-[115px] h-[35px]  rounded-md bg-grayscale-5 text-grayscale-60"
            type="button"
            onClick={onCancel}
          >
            취소
          </button>
          <button
            className="w-[115px] h-[35px] rounded-md bg-primary-80 text-white"
            type="button"
            onClick={() => {
              if (feedbackId) {
                mutate();
                setToastMsg("삭제가 완료되었습니다.");
              }
              onConfirm();
            }}
          >
            {confirmBtnMsg}
          </button>
        </div>
      </div>
    </>
  );
};

export default AssignmentLocalConfirmDialog;
