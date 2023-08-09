import { ILecture } from "@/hooks/queries/useGetCourseList";
import ContentImg from "./ContentImg";
import ContentInfo from "./ContentInfo";
import LectureDeleteModal from "../modal/createLecture/LectureDeleteModal";
import { useState } from "react";
import useDeleteLecture from "@/hooks/mutation/useDeleteLecture";

const ContentCard = ({ lecture, role }: { lecture: ILecture, role:string }) => {
  const [deleteModal, setDeleteModal] = useState(false);
  const { mutate: deleteLecture } = useDeleteLecture(lecture.lectureId);
  return (
    <>
      <div className="w-[775px] h-[200px] border rounded-lg p-[10px] flex flex-row items-center mb-[15px]">
        <ContentImg isPrivate={lecture.isPrivate} />
        <ContentInfo lecture={lecture} setDeleteModal={setDeleteModal} role={role}/>
      </div>
      {deleteModal && (
        <LectureDeleteModal
          onCancel={() => setDeleteModal(false)}
          onDelete={() =>
            deleteLecture(
              {},
              {
                onSuccess: () => {
                  setDeleteModal(false);
                },
              },
            )
          }
        />
      )}
    </>
  );
};

export default ContentCard;