import { useDispatch } from "react-redux";
import { storage } from "@/utils/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { setNoteImages } from "@/redux/slice/lectureInfoSlice";

const useUploadImage = () => {
  const dispatch = useDispatch();

  const onUploadImage = async (uploadFile: File) => {
    const storageRef = ref(storage);
    const fileRef = ref(storageRef, `lectures/noteImages/${uploadFile.name}`);

    try {
      const snapshot = await uploadBytesResumable(fileRef, uploadFile);
      const url = await getDownloadURL(snapshot.ref);

      if (uploadFile.type.includes("image")) {
        dispatch(setNoteImages(url));
      }
      return url;
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return { onUploadImage };
};

export default useUploadImage;
