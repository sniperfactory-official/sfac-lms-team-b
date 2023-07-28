import { closeModal } from "@/redux/slice/classroomModalSlice";
import { resetInputContent } from "@/redux/slice/linkContentSlice";
import { useDispatch } from "react-redux";
const ModalSubmitButton: React.FC = () => {
  const dispatch = useDispatch();
  const lectureUpload = () => {
    dispatch(closeModal());
    dispatch(resetInputContent());
  };
  return (
    <button
      type="submit"
      onClick={lectureUpload}
      className="w-[107px] h-[45px] rounded-[10px] font-bold text-base text-grayscale-20 bg-grayscale-5 hover:text-white hover:bg-primary-80"
    >
      업로드
    </button>
  );
};

export default ModalSubmitButton;
