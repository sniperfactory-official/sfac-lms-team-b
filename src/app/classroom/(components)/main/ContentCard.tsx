import { useDispatch } from "react-redux";
import ContentImg from "./ContentImg";
import ContentInfo from "./ContentInfo";
import LectureDeleteModal from "../modal/createLecture/LectureDeleteModal";
import useClassroomModal from "@/hooks/lecture/useClassroomModal";
import useDeleteFile from "@/hooks/lecture/useDeleteFile";
import { ILecture } from "@/hooks/queries/useGetCourseList";
import useDeleteLecture from "@/hooks/mutation/useDeleteLecture";
import { setModalVisibility } from "@/redux/slice/classroomModalSlice";

const ContentCard = ({ lecture }: { lecture: ILecture }) => {
  const dispatch = useDispatch();
  const { lectureInfo, lectureDeleteModalOpen } = useClassroomModal();
  const { onDeleteFile } = useDeleteFile();
  const { mutate: deleteLecture } = useDeleteLecture(lecture.lectureId);

  const deleteModalClose = () => {
    dispatch(
      setModalVisibility({
        modalName: "lectureDeleteModalOpen",
        visible: false,
        modalRole: "delete",
      }),
    );
  };

  return (
    <>
      <div className="w-[775px] h-[200px] border rounded-lg p-[10px] flex flex-row items-center mb-[15px]">
        <ContentImg isPrivate={lecture.isPrivate} />
        <ContentInfo lecture={lecture} role={role}/>
      </div>
      {lectureDeleteModalOpen && (
        <LectureDeleteModal
          onCancel={deleteModalClose}
          onDelete={() => {
            deleteLecture();
            deleteModalClose();
            lectureInfo?.lectureContent.videoUrl &&
              onDeleteFile(lectureInfo?.lectureContent.videoUrl);
          }}
        />
      )}
    </>
  );
};

export default ContentCard;
