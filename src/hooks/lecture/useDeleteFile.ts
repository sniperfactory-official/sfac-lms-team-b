import { useDispatch } from "react-redux";
import { storage } from "@/utils/firebase";
import { deleteObject, ref } from "firebase/storage";
import { resetDropzone } from "@/redux/slice/dropzoneFileSlice";
import { setVideoLength, setVideoURL } from "@/redux/slice/lectureInfoSlice";

const useDeleteFile = () => {
  const dispatch = useDispatch();

  const onDeleteFile = async (deleteFileURL: string) => {
    const fileRef = ref(storage, deleteFileURL);
    try {
      await deleteObject(fileRef);
      dispatch(resetDropzone());
      dispatch(setVideoURL(""));
      dispatch(setVideoLength(0));
    } catch (error) {
      console.error("Error delete file:", error);
    }
  };

  return { onDeleteFile };
};

export default useDeleteFile;
