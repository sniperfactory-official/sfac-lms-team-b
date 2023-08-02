import { useState } from "react";
import { useDispatch } from "react-redux";
import { storage } from "@/utils/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { setNoteImages } from "@/redux/slice/lectureInfoSlice";

const useUploadNoteImage = () => {
  const [isUploading, setUploading] = useState<boolean>(false);
  const dispatch = useDispatch();

  const onUploadImage = async (imageFile: File) => {
    const storageRef = ref(storage);
    const noteImageRef = ref(
      storageRef,
      `lectures/noteImages/${imageFile.name}`,
    );

    try {
      setUploading(true);
      const snapshot = await uploadBytes(noteImageRef, imageFile);
      const url = await getDownloadURL(snapshot.ref);
      dispatch(setNoteImages(url));
      return url;
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setUploading(false);
    }
  };

  return { onUploadImage };
};

export default useUploadNoteImage;
