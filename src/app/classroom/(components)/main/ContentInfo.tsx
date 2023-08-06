import timestampToDate from "@/utils/timestampToDate";
import { convertSecondsToMinute } from "@/utils/convertSecondsToMinute";
import { setModalVisibility } from "@/redux/slice/classroomModalSlice";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { ILecture } from "@/hooks/queries/useGetCourseList";

interface IProps {
  setDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
  lecture: ILecture;
}

const ContentInfo = ({ lecture, setDeleteModal }: IProps) => {
  const { title, lectureType, startDate, endDate, lectureContent } = lecture;

  const router = useRouter();
  const dispatch = useDispatch();
  const handleMovePage = () => {
    router.push(`/classroom/${lecture.lectureId}`);
  };
  const handleDeleteModal = () => {
    setDeleteModal(true);
  };

  const [start, end] = [timestampToDate(startDate), timestampToDate(endDate)];
  const videoLength = convertSecondsToMinute(lectureContent.videoLength!);

  const LECTURE_OBJ = {
    노트: {
      emoji: "📒",
      text: "노트",
      time: "",
      modal: "noteModalOpen",
    },
    비디오: {
      emoji: "🎬",
      text: "비디오",
      time: videoLength,
      modal: "videoFileModalOpen",
    },
    링크: {
      emoji: "🔗",
      text: "링크",
      time: "",
      modal: "linkModalOpen",
    },
  };
  const handleEditLectureModal = () => {
    dispatch(
      setModalVisibility({
        modalName: LECTURE_OBJ[lectureType].modal,
        visible: true,
        modalRole: "edit",
      }),
    );
  };

  return (
    <div className="w-2/3 h-5/6 ml-20px flex flex-col">
      <div className="text-xs ml-auto flex items-center w-[60px] text-grayscale-100 justify-around text-[12px]">
        <button className="text-xs" onClick={handleEditLectureModal}>
          수정
        </button>
        <div className="w-[0.5px] h-3 border-[0.5px] border-black"></div>
        <button className="text-xs" onClick={() => handleDeleteModal()}>
          삭제
        </button>
      </div>
      {lectureType === "비디오" && (
        <div className="bg-grayscale-5 rounded w-[40px] h-[20px] text-xs text-center leading-[20px] mb-[10px] text-grayscale-60">
          {LECTURE_OBJ[lectureType].time}분
        </div>
      )}
      <div className="font-bold mb-[10px]">
        {LECTURE_OBJ[lectureType].emoji} {title}
      </div>
      <div className="flex flex-row justify-between mt-[20px]">
        <div className="flex flex-col">
          <div className="text-xs">[수강기간]</div>
          <div className="text-xs">
            {start}-{end}
          </div>
        </div>
        <button
          className="w-[140px] h-[35px] bg-grayscale-5 text-center leading-[35px] text-sm rounded-lg"
          onClick={() => handleMovePage()}
        >
          {LECTURE_OBJ[lectureType].text}보기
        </button>
      </div>
    </div>
  );
};

export default ContentInfo;
