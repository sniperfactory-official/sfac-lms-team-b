import { useEffect } from "react";
import { useUpdateCompletion } from "@/hooks/mutation/useUpdateCompletion";

export const useLectureCompletion = (id: string, isCompleted: boolean) => {
  const updateCompletion = useUpdateCompletion();

  useEffect(() => {
    if (isCompleted) {
      (async () => {
        await updateCompletion.mutateAsync(id);
      })();
    }
  }, [isCompleted]);
};
