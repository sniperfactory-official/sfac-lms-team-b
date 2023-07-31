import LectureSetting from "./LectureSetting";
import { closeModal } from "@/redux/slice/classroomModalSlice";
import { resetInput } from "@/redux/slice/lectureInfoSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const ModalFooter: React.FC = () => {
  const dispatch = useDispatch();
  const startDate = useSelector(
    (state: RootState) => state.lectureInfo.startDate,
  );
  const endDate = useSelector((state: RootState) => state.lectureInfo.endDate);

  const lectureUpload = () => {
    if (startDate && endDate) {
    }

    dispatch(closeModal());
    dispatch(resetInput());
  };
  return (
    <div className="flex justify-between mb-[-20px]">
      <LectureSetting />
      <button
        type="submit"
        className="w-[107px] h-[45px] rounded-[10px] font-bold text-base text-grayscale-20 bg-grayscale-5 hover:text-white hover:bg-primary-80"
      >
        업로드
      </button>
    </div>
  );
};

export default ModalFooter;
