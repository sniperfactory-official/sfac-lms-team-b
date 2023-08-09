import { useMutation } from "@tanstack/react-query";
import { storage } from "@utils/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const useFilesUpload = () => {
  const uploadFiles = async (file: File) => {
    const storageRef = ref(storage, `attachments/${file.name}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    return url;
  };

  return useMutation(uploadFiles);
};

export default useFilesUpload;
