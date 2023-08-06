interface LectureDeleteModalProps {
  onCancel: () => void;
  onDelete: () => void;
}

const LectureDeleteModal: React.FunctionComponent<LectureDeleteModalProps> = ({
  onCancel,
  onDelete,
}) => {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-black/30 flex flex-col justify-center items-center z-40">
      <div className="relative w-[477px] bg-white px-[35px] py-[40px] flex flex-col gap-[16px] rounded-lg border border-gray-300 shadow-md p-4 justify-center items-center">
        <span className="font-bold text-[20px]">강의를 삭제하시겠습니까?</span>
        <div className="flex gap-[8px]">
          <button
            onClick={onCancel}
            className=" bg-grayscale-5 w-[115px] h-[35px] rounded-lg px-[18px] font-bold text-[14px] justify-center items-center"
          >
            취소
          </button>
          <button
            onClick={onDelete}
            className=" bg-red text-white font-bold text-[14px] w-[115px] h-[35px] rounded-lg px-[18px] justify-center items-center"
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  );
};
export default LectureDeleteModal;
