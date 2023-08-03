import { useDispatch } from "react-redux";
import { storage } from "@/utils/firebase";
import { deleteObject, ref } from "firebase/storage";
import { reset } from "@/redux/slice/dropzoneFileSlice";

const useDeleteFile = () => {
  const dispatch = useDispatch();

  const onDeleteFile = async (deleteFileURL: string) => {
    const fileRef = ref(storage, deleteFileURL);
    try {
      await deleteObject(fileRef);
      dispatch(reset());
    } catch (error) {
      console.error("Error delete file:", error);
    }
  };

  return { onDeleteFile };
};

export default useDeleteFile;
