import { useState } from "react";
import { useDispatch } from "react-redux";
import { storage } from "@/utils/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { setNoteImages, setVideoURL } from "@/redux/slice/lectureInfoSlice";
import { setVideoFileName } from "@/redux/slice/dropzoneFileSlice";

const useUploadFile = () => {
  const [isUploading, setUploading] = useState<boolean>(false);
  const dispatch = useDispatch();

  const onUploadFile = async (uploadFile: File) => {
    const filePath = uploadFile.type.includes("image")
      ? `lectures/noteImages/${uploadFile.name}`
      : `lectures/videos/${uploadFile.name}`;
    const storageRef = ref(storage);
    const fileRef = ref(storageRef, filePath);

    try {
      setUploading(true);
      const snapshot = await uploadBytesResumable(fileRef, uploadFile);
      const url = await getDownloadURL(snapshot.ref);

      if (uploadFile.type.includes("image")) {
        dispatch(setNoteImages(url));
      } else if (uploadFile.type.includes("video")) {
        dispatch(setVideoURL(url));
        dispatch(setVideoFileName(fileRef.name));
      }
      return url;
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setUploading(false);
    }
  };

  return { isUploading, onUploadFile };
};

export default useUploadFile;
