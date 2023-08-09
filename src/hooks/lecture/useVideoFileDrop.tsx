import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { FileRejection, useDropzone } from "react-dropzone";
import { setErrorMessage } from "@/redux/slice/dropzoneFileSlice";
import useUploadVideo from "./useUploadVideo";
import useDeleteFile from "./useDeleteFile";
import useLectureInfo from "./useLectureInfo";

const useVideoFileDrop = () => {
  const dispatch = useDispatch();
  const videoFileName = useSelector(
    (state: RootState) => state.dropzoneFile.videoFileName,
  );
  const { onUploadVideo } = useUploadVideo();
  const { onDeleteFile } = useDeleteFile();
  const { videoURL } = useLectureInfo();

  const onDrop = useCallback(
    (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      if (videoFileName) {
        dispatch(
          setErrorMessage(
            "이미 사용 중인 파일이 있습니다. 기존의 파일을 삭제하고 진행해주세요.",
          ),
        );
      } else if (acceptedFiles.length > 0) {
        onUploadVideo(acceptedFiles[0]);
      } else if (fileRejections.length > 0) {
        if (
          fileRejections[0].errors[0].message ===
          "File type must be video/*,.mp4,.wav,.avi"
        ) {
          dispatch(
            setErrorMessage("파일 형식이 올바르지 않습니다. (mp4, wav, avi)"),
          );
        } else {
          dispatch(
            setErrorMessage(
              `에러가 발생하였습니다. 다시 시도해주세요. (${fileRejections[0].errors[0].message})`,
            ),
          );
        }
      }
    },
    [dispatch, videoFileName, onUploadVideo],
  );

  const handleRemoveVideoFile = () => {
    onDeleteFile(videoURL);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: { "video/*": [".mp4", ".wav", ".avi"] },
    noClick: true,
  });

  return {
    getRootProps,
    getInputProps,
    isDragActive,
    handleRemoveVideoFile,
  };
};

export default useVideoFileDrop;
