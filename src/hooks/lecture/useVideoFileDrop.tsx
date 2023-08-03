import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { FileRejection, useDropzone } from "react-dropzone";
import {
  setErrorMessage,
  setSuccessMessage,
} from "@/redux/slice/dropzoneFileSlice";
import useUploadFile from "./useUploadFile";
import { setVideoLength } from "@/redux/slice/lectureInfoSlice";
import useDeleteFile from "./useDeleteFile";

const useVideoFileDrop = () => {
  const dispatch = useDispatch();
  const videoFileName = useSelector(
    (state: RootState) => state.dropzoneFile.videoFileName,
  );
  const videoURL = useSelector(
    (state: RootState) => state.lectureInfo.videoURL,
  );
  const { isUploading, onUploadFile } = useUploadFile();
  const { onDeleteFile } = useDeleteFile();

  const onDrop = useCallback(
    async (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      if (videoFileName) {
        dispatch(
          setErrorMessage(
            "이미 사용 중인 파일이 있습니다. 기존의 파일을 삭제하고 진행해주세요.",
          ),
        );
      } else if (acceptedFiles.length > 0) {
        const file: File = acceptedFiles[0];
        const videoFileURL: string | undefined = await onUploadFile(file);

        if (videoFileURL) {
          const videoElement: HTMLVideoElement =
            document.createElement("video");
          videoElement.src = videoFileURL;
          videoElement.onloadedmetadata = () => {
            dispatch(setVideoLength(videoElement.duration));
          };
        }

        dispatch(setSuccessMessage("파일이 업로드되었습니다!"));
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
    [dispatch, videoFileName, onUploadFile],
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
