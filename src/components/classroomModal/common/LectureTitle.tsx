import { useDispatch, useSelector } from "react-redux";
import { setInputTitle } from "@/redux/slice/lectureTitleSlice";

const LectureTitle: React.FC = () => {
  const lectureTitle = useSelector((state: any) => state.title.lectureTitle);

  const dispatch = useDispatch();

  const handleInputTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setInputTitle(e.target.value));
  };

  return (
    <label htmlFor="lectureTitle">
      <input
        type="text"
        name="lectureTitle"
        id="lectureTitle"
        placeholder="제목을 입력해주세요. (필수)"
        className="text-grayscale-80 outline-none text-xl font-medium placeholder-grayscale-40"
        value={lectureTitle}
        onChange={handleInputTitle}
      />
    </label>
  );
};

export default LectureTitle;
