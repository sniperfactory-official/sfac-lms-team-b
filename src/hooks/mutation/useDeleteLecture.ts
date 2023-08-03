import { doc, deleteDoc } from "firebase/firestore";
import { db } from "@/utils/firebase"; 
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "@/constants/queryKey";

const deleteLecture = async (lectureId:string) => {
  const lectureRef = doc(db, "lectures", lectureId);

  try {
    await deleteDoc(lectureRef);
    console.log("Lecture successfully deleted!");
  } catch (error) {
    console.error("Error deleting lecture: ", error);
  }
}

const useDeleteLecture = (lectureId:string) => {
  const queryClient = useQueryClient();
  return useMutation( () => deleteLecture(lectureId), {
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEY.COURSE]);
    }
  })
}

export default useDeleteLecture