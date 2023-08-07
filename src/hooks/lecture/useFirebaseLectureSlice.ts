import { useEffect } from "react";
import { useDispatch } from "react-redux";
import useClassroomModal from "./useClassroomModal";
import {
  setCourseId,
  setLectureType,
  setLectureTitle,
  setExternalLink,
  setTextContent,
  setNoteImages,
  setVideoURL,
  setVideoLength,
  setStartDate,
  setEndDate,
  setIsLecturePrivate,
} from "@/redux/slice/lectureInfoSlice";
import {
  setErrorMessage,
  setVideoFileName,
} from "@/redux/slice/dropzoneFileSlice";

const useFirebaseLectureSlice = () => {
  const dispatch = useDispatch();
  const { lecture } = useClassroomModal();

  useEffect(() => {
    if (lecture) {
      dispatch(setCourseId(lecture.courseId));
      dispatch(setLectureType(lecture.lectureType));
      dispatch(setLectureTitle(lecture.title));
      dispatch(setExternalLink(lecture.lectureContent.externalLink));
      dispatch(setTextContent(lecture.lectureContent.textContent));
      dispatch(setNoteImages(lecture.lectureContent.images));
      dispatch(setVideoURL(lecture.lectureContent.videoUrl));
      dispatch(setVideoLength(lecture.lectureContent.videoLength));
      dispatch(setStartDate(lecture.startDate));
      dispatch(setEndDate(lecture.endDate));
      dispatch(setIsLecturePrivate(lecture.isPrivate));

      if (lecture.lectureContent.videoUrl) {
        const urlParts = lecture.lectureContent.videoUrl
          .split("?")[0]
          .split("/");
        const filePath = decodeURIComponent(urlParts[urlParts.length - 1]);
        const fileName = filePath.split("/")[2];
        dispatch(setVideoFileName(fileName));
        dispatch(
          setErrorMessage(
            "이미 사용 중인 파일이 있습니다. 기존의 파일을 삭제하고 진행해주세요.",
          ),
        );
      }
    }
  }, [dispatch, lecture]);
};

export default useFirebaseLectureSlice;
