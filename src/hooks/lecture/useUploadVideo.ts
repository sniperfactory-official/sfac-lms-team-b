import { useDispatch } from "react-redux";
import { storage } from "@/utils/firebase";
import {
  StorageReference,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { setVideoLength, setVideoURL } from "@/redux/slice/lectureInfoSlice";
import {
  setErrorMessage,
  setSuccessMessage,
  setVideoFileName,
} from "@/redux/slice/dropzoneFileSlice";

const useUploadVideo = () => {
  const dispatch = useDispatch();

  const handleFileUploadSuccess = async (fileRef: StorageReference) => {
    const url = await getDownloadURL(fileRef);
    dispatch(setVideoURL(url));
    dispatch(setVideoFileName(fileRef.name));
    dispatch(setSuccessMessage("파일이 업로드되었습니다!"));

    const videoElement: HTMLVideoElement = document.createElement("video");
    videoElement.src = url;
    videoElement.onloadedmetadata = () => {
      dispatch(setVideoLength(videoElement.duration));
    };
  };

  const onUploadVideo = (uploadFile: File) => {
    try {
      const storageRef = ref(storage);
      const fileRef = ref(storageRef, `lectures/videos/${uploadFile.name}`);
      const uploadTask = uploadBytesResumable(fileRef, uploadFile);

      uploadTask.on(
        "state_changed",
        snapshot => {
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              dispatch(setErrorMessage("파일을 업로드 중입니다."));
              break;
          }
        },
        error => {
          console.error("업로드 실패:", error);
        },
        () => {
          handleFileUploadSuccess(fileRef);
        },
      );
    } catch (error) {
      console.error("파일 업로드 오류:", error);
    }
  };

  return { onUploadVideo };
};

export default useUploadVideo;
