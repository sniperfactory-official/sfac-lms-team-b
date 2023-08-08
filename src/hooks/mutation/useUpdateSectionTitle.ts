import { db } from "@/utils/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { QUERY_KEY } from "@/constants/queryKey";

type UpdateTitleParams = {
  docId: string;
  newTitle: string;
};

async function updateCourseTitle({ docId, newTitle }: UpdateTitleParams) {
  console.log(docId, newTitle);
  const courseRef = doc(db, "courses", docId);

  // Update title field
  await updateDoc(courseRef, {title: newTitle});
}

const useUpdateSectionTitle = () => {
  const queryClient = useQueryClient();

  return useMutation((params: UpdateTitleParams) => updateCourseTitle(params), {
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEY.COURSE]);
    },
  });
}

export default useUpdateSectionTitle;