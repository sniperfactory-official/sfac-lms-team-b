import { Button } from "sfac-designkit-react";

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
          <Button
            variant="secondary"
            text="취소"
            asChild
            onClick={onCancel}
            className="w-[115px]"
          />
          <Button
            variant="destructive"
            text="삭제"
            asChild
            onClick={onDelete}
            className="w-[115px]"
          />
        </div>
      </div>
    </div>
  );
};
export default LectureDeleteModal;
