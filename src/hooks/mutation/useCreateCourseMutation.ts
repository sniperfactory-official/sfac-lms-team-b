import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "@/constants/queryKey";
import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
} from "firebase/firestore";
import { db } from "@utils/firebase";

const createCourse = async () => {
  const coursesCollection = collection(db, "courses");
  const courseSnapshot = await getDocs(coursesCollection);
  const courseData = {
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    title: "새로운 섹션",
    order: courseSnapshot.size,
  };

  try {
    const docRef = await addDoc(collection(db, "courses"), courseData);
    console.log("Document written with ID: ", docRef.id);
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};

const useCreateCourseMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(createCourse, {
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEY.COURSE]);
    },
  });
};

export default useCreateCourseMutation;
