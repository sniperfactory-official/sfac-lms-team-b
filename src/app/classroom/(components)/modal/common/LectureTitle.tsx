import { useDispatch, useSelector } from "react-redux";
import { setLectureTitle, clearError } from "@/redux/slice/lectureInfoSlice";
import { RootState } from "@/redux/store";
import { Textarea } from "sfac-designkit-react";

const LectureTitle: React.FC = () => {
  const lectureTitle = useSelector(
    (state: RootState) => state.lectureInfo.lectureTitle,
  );
  const dispatch = useDispatch();

  const handleInputTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setLectureTitle(e.target.value));
    console.log(e.target);
    if (e.target.value.trim()) {
      dispatch(clearError());
    }
  };

  return (
    <label htmlFor="lectureTitle">
      <input
        type="text"
        name="lectureTitle"
        id="lectureTitle"
        placeholder="제목을 입력해주세요. (필수)"
        className="text-grayscale-80 outline-none text-xl font-medium placeholder-grayscale-40 w-full"
        onChange={handleInputTitle}
        value={lectureTitle}
      />
    </label>
  );
};

export default LectureTitle;
