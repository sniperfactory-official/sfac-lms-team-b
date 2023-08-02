import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import useAuth from "../user/useAuth";

const useLectureInfo = () => {
  const user = useAuth();
  const courseId: string = useSelector(
    (state: RootState) => state.lectureInfo.courseId,
  );
  const lectureType: string = useSelector(
    (state: RootState) => state.lectureInfo.lectureType,
  );
  const lectureTitle: string = useSelector(
    (state: RootState) => state.lectureInfo.lectureTitle,
  );
  const lectureContent: string = useSelector(
    (state: RootState) => state.lectureInfo.lectureContent,
  );
  const noteImages: string[] = useSelector(
    (state: RootState) => state.lectureInfo.noteImages,
  );
  const startDate = useSelector(
    (state: RootState) => state.lectureInfo.startDate,
  );
  const endDate = useSelector((state: RootState) => state.lectureInfo.endDate);
  const isLecturePrivate: boolean = useSelector(
    (state: RootState) => state.lectureInfo.isLecturePrivate,
  );

  return {
    user,
    courseId,
    lectureType,
    lectureTitle,
    lectureContent,
    noteImages,
    startDate,
    endDate,
    isLecturePrivate,
  };
};

export default useLectureInfo;
