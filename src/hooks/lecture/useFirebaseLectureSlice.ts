import { useEffect } from "react";
import { useDispatch } from "react-redux";
import useClassroomModal from "./useClassroomModal";
import {
  setCourseId,
  setEndDate,
  setExternalLink,
  setIsLecturePrivate,
  setLectureTitle,
  setLectureType,
  setStartDate,
} from "@/redux/slice/lectureInfoSlice";


const useFirebaseLectureSlice = () => {
  const dispatch = useDispatch();
  const { lecture } = useClassroomModal();

  useEffect(() => {
    if (lecture) {
      dispatch(setCourseId(lecture.courseId));
      dispatch(setLectureType(lecture.lectureType));
      dispatch(setLectureTitle(lecture.title));
      dispatch(setExternalLink(lecture.lectureContent.externalLink));
      dispatch(setStartDate(lecture.startDate));
      dispatch(setEndDate(lecture.endDate));
      dispatch(setIsLecturePrivate(lecture.isPrivate));
    }
  }, [dispatch, lecture]);
};

export default useFirebaseLectureSlice;
