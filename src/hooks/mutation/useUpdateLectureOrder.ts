import { doc, updateDoc } from "firebase/firestore";
import { db } from "@utils/firebase";
import { ILecture } from "../queries/useGetCourseList";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "@/constants/queryKey";

const updateLectureOrder = async ({
  currentLectures,
}: {
  currentLectures: ILecture[];
}) => {
  for (let i = 0; i < currentLectures.length; i++) {
    const docRef = doc(db, "lectures", currentLectures[i].lectureId);
    await updateDoc(docRef, {
      order: i + 1,
    });
  }
};

const useUpdateLectureOrder = () => {
  const queryClient = useQueryClient();

  return useMutation(updateLectureOrder, {
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEY.COURSE]);
    },
  });
};

export default useUpdateLectureOrder;
