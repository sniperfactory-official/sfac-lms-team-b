import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useClassroomModal from "./useClassroomModal";
import {
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
  const { lectureInfo } = useClassroomModal();

  useEffect(() => {
    if (lectureInfo) {
      dispatch(setLectureTitle(lectureInfo.title));
      dispatch(setExternalLink(lectureInfo.lectureContent.externalLink));
      dispatch(setTextContent(lectureInfo.lectureContent.textContent));
      dispatch(setNoteImages(lectureInfo.lectureContent.images));
      dispatch(setVideoURL(lectureInfo.lectureContent.videoUrl));
      dispatch(setVideoLength(lectureInfo.lectureContent.videoLength));
      dispatch(setStartDate(lectureInfo.startDate));
      dispatch(setEndDate(lectureInfo.endDate));
      dispatch(setIsLecturePrivate(lectureInfo.isPrivate));

      if (lectureInfo.lectureContent.videoUrl) {
        const urlParts = lectureInfo.lectureContent.videoUrl
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
  }, [dispatch, lectureInfo]);
};

export default useFirebaseLectureSlice;
