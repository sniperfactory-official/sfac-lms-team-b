import { useMutation, useQueryClient } from "@tanstack/react-query";
import { storage } from "@utils/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const useImageUpload = () => {
  const uploadImage = async (file: File) => {
    const storageRef = ref(storage, `assignments/images/${file.name}`); // storage 모듈 사용
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    return url;
  };

  return useMutation(uploadImage);
};

export default useImageUpload;
