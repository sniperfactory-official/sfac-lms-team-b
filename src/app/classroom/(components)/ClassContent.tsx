import { useDispatch } from "react-redux";
import ContentCard from "./main/ContentCard";
import MakeLectureModal from "./modal/createLecture/MakeLectureModal";
import AddNoteModal from "./modal/createLecture/AddNoteModal";
import AddLinkModal from "./modal/createLecture/AddLinkModal";
import AddVideoFileModal from "./modal/createLecture/AddVideoFileModal";
import useClassroomModal from "@/hooks/lecture/useClassroomModal";
import { setModalVisibility } from "@/redux/slice/classroomModalSlice";
import { ICourseField, ILecture } from "@/hooks/queries/useGetCourseList";

interface IProps {
  currentCourse: ICourseField;
}

const ClassContent = ({ currentCourse }: IProps) => {
  const dispatch = useDispatch();
  const {
    lectureTypeModalOpen,
    noteModalOpen,
    linkModalOpen,
    videoFileModalOpen,
  } = useClassroomModal();

  const handleModalOpen = () => {
    dispatch(
      setModalVisibility({ modalName: "lectureTypeModalOpen", visible: true }),
    );
  };

  return (
    <div className="w-4/5 h-100 pt-[50px] ml-[50px]">
      <div className="flex justify-between w-100">
        <div className="flex flex-col w-[150px] mb-[20px]">
          <div className="text-lg font-bold">
            {currentCourse.courseData.title}
          </div>
          <div className="font-thin text-sm">
            강의 {currentCourse.lectureList.length}개
          </div>
        </div>
        <button
          onClick={handleModalOpen}
          className="w-[109px] h-[35px] bg-primary-80 rounded-lg text-white text-sm"
        >
          강의 만들기
        </button>
      </div>
      {currentCourse.lectureList.map((lecture: ILecture) => (
        <ContentCard key={lecture.title} lecture={lecture} />
      ))}
      {lectureTypeModalOpen && <MakeLectureModal />}
      {noteModalOpen && <AddNoteModal />}
      {linkModalOpen && <AddLinkModal />}
      {videoFileModalOpen && <AddVideoFileModal />}
    </div>
  );
};

export default ClassContent;
