import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import useAuth from "../user/useAuth";

const useLectureInfo = () => {
  const user = useAuth();
  const courseId: string = useSelector(
    (state: RootState) => state.lectureInfo.courseId,
  );
  const lectureTitle: string = useSelector(
    (state: RootState) => state.lectureInfo.lectureTitle,
  );
  const lectureContent: string = useSelector(
    (state: RootState) => state.lectureInfo.lectureContent,
  );
  const noteImages: File | null = useSelector(
    (state: RootState) => state.lectureInfo.noteImages,
  );
  const lectureType: string = useSelector(
    (state: RootState) => state.lectureInfo.lectureType,
  );
  const dateRange = useSelector(
    (state: RootState) => state.lectureInfo.dateRange,
  );
  const isLecturePublic: boolean = useSelector(
    (state: RootState) => state.lectureInfo.isLecturePublic,
  );

  return {
    user,
    courseId,
    lectureTitle,
    lectureContent,
    noteImages,
    lectureType,
    dateRange,
    isLecturePublic,
  };
};

export default useLectureInfo;
