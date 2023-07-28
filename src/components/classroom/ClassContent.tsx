import { useDispatch } from "react-redux";
import ContentCard from "./ContentCard";
import ContentCard from "./main/ContentCard";
import MakeLectureModal from "../classroomModal/createLecture/MakeLectureModal";
import AddNoteModal from "../classroomModal/createLecture/AddNoteModal";
import AddLinkModal from "../classroomModal/createLecture/AddLinkModal";
import AddVideoFileModal from "../classroomModal/createLecture/AddVideoFileModal";
import useClassroomModal from "@/hooks/lecture/useClassroomModal";
import { setModalVisibility } from "@/redux/slice/classroomModalSlice";
import { ICourseField } from "@/hooks/queries/useGetCourseList";
import { Lecture } from "@/types/firebase.Types";
        
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
    <div className="w-4/5 h-100 pt-[100px] ml-[50px]">
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
      {currentCourse.lectureList.map((lecture: Lecture) => (
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
