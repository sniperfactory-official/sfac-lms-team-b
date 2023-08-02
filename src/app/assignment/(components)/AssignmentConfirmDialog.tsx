type OwnProps = {
  onConfirm: () => void;
  onCancel: () => void;
  isGlobal: boolean; // dim처리된 모달(isGlobal) / dim처리없는 모달 안에 모달(!isGlobal)
  isOpen: boolean;
  title: string; // 모달 타이틀
  desc?: string; // 모달 설명
  confirmBtnMsg: string; // 컨펌 확인 버튼 글자
};

const AssignmentConfirmDialog: React.FC<OwnProps> = ({
  onConfirm,
  onCancel,
  isGlobal,
  isOpen,
  title,
  desc,
  confirmBtnMsg,
}) => {
  return (
    <>
      {isGlobal ? (
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
              <div className="flex justify-center item-center gap-[22px]">
                <button
                  className="w-[115px] h-[35px] border"
                  type="button"
                  onClick={onCancel}
                >
                  취소
                </button>
                <button
                  className="w-[115px] h-[35px] border"
                  type="button"
                  onClick={onConfirm}
                >
                  {confirmBtnMsg}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          className={`absolute transition-opacity duration-300 shadow-24dp w-[420px] h-[155px] rounded-[10px] p-[18px_21px] bg-white ${
            isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <h4 className="mb-[15px] text-[14px] font-[700] text-grayscale-80">
            {title}
          </h4>
          <p className="text-[12px] font-[500] text-grayscale-80 mb-[16px]">
            {desc}
          </p>
          <div className="flex justify-end item-center gap-[8px]">
            <button
              className="w-[115px] h-[35px] border"
              type="button"
              onClick={onCancel}
            >
              취소
            </button>
            <button
              className="w-[115px] h-[35px] border"
              type="button"
              onClick={onConfirm}
            >
              {confirmBtnMsg}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AssignmentConfirmDialog;
