import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import useUser from "../user/useUser";

const useLectureInfo = () => {
  const { user } = useUser();
  const courseId: string = useSelector(
    (state: RootState) => state.lectureInfo.courseId,
  );
  const lectureType: string = useSelector(
    (state: RootState) => state.lectureInfo.lectureType,
  );
  const externalLink: string = useSelector(
    (state: RootState) => state.lectureInfo.externalLink,
  );
  const lectureTitle: string = useSelector(
    (state: RootState) => state.lectureInfo.lectureTitle,
  );
  const textContent: string = useSelector(
    (state: RootState) => state.lectureInfo.textContent,
  );
  const noteImages: string[] = useSelector(
    (state: RootState) => state.lectureInfo.noteImages,
  );
  const videoURL: string = useSelector(
    (state: RootState) => state.lectureInfo.videoURL,
  );
  const videoLength: number = useSelector(
    (state: RootState) => state.lectureInfo.videoLength,
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
    externalLink,
    textContent,
    noteImages,
    videoURL,
    videoLength,
    startDate,
    endDate,
    isLecturePrivate,
  };
};

export default useLectureInfo;
