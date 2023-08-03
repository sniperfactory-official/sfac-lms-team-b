import { ILecture } from "@/hooks/queries/useGetCourseList";
import { useRouter } from "next/navigation";
import timestampToDate from "@/utils/timestampToDate";
import Image from "next/image";
import thumnail from "../../../../../public/images/thumnail.png";
import { convertSecondsToMinute } from "@/utils/convertSecondsToMinute";
import LectureDeleteModal from "../modal/createLecture/LectureDeleteModal";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setModalVisibility } from "@/redux/slice/classroomModalSlice";

const ContentCard = ({ lecture }: { lecture: ILecture }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const handleMovePage = () => {
    router.push(`/classroom/${lecture.lectureId}`);
  };

  const { title, lectureType, isPrivate, startDate, endDate, lectureContent } =
    lecture;
  const [start, end] = [timestampToDate(startDate), timestampToDate(endDate)];
  const videoLength = convertSecondsToMinute(lectureContent.videoLength!);

  const LECTURE_OBJ = {
    노트: {
      emoji: "📒",
      text: "노트",
      time: "",
    },
    비디오: {
      emoji: "🎬",
      text: "비디오",
      time: videoLength,
    },
    링크: {
      emoji: "🔗",
      text: "링크",
      time: "",
    },
  };
  const MODAL_OBJ: { [key: string]: string } = {
    노트: "noteModalOpen",
    링크: "linkModalOpen",
    비디오: "videoFileModalOpen",
  };
  const [deleteModal, setDeleteModal] = useState(false);
  const handleDeleteModal = () => {
    //강의 삭제 로직 구현하시면 됩니당
    setDeleteModal(false);
  };
  const handleEditLectureModal = () => {
    dispatch(
      setModalVisibility({
        modalName: MODAL_OBJ[lectureType],
        visible: true,
        modalRole: "edit",
      }),
    );
  };

  return (
    <div className="w-[775px] h-[200px] border rounded-lg p-[10px] flex flex-row items-center mb-[15px]">
      {/* {lectureContent.images!.length !== 0 ? 
      <div className="w-1/3 h-5/6 bg-primary-40 rounded-lg mr-[25px]">
        <Image src={lectureContent.images![0]} alt="thumbnail" width={100} height={100}/>
      </div> :  */}
      <div className="w-1/3 h-5/6 rounded-lg mr-[25px]">
        <Image src={thumnail} alt="thumnail" placeholder="blur" />
      </div>
      <div className="w-2/3 h-5/6 ml-20px flex flex-col">
        <div className="text-xs ml-auto flex items-center w-[60px] text-grayscale-100 justify-around text-[12px]">
          <button className="text-xs" onClick={handleEditLectureModal}>
            수정
          </button>
          <div className="w-[0.5px] h-3 border-[0.5px] border-black"></div>
          <button className="text-xs">삭제</button>
        </div>
        {lectureType === "비디오" && (
          <div className="bg-grayscale-5 rounded w-[40px] h-[20px] text-xs text-center leading-[20px] mb-[10px] text-grayscale-60">
            {LECTURE_OBJ[lectureType].time}분
          </div>
        )}
        <div className="font-bold mb-[10px]">
          {LECTURE_OBJ[lectureType].emoji} {lecture.title}
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
        {deleteModal && (
          <LectureDeleteModal
            onCancel={() => setDeleteModal(false)}
            onDelete={handleDeleteModal}
          />
        )}
      </div>
    </div>
  );
};

export default ContentCard;
