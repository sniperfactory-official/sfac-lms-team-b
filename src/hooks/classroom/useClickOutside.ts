import { RefObject, useEffect, useCallback } from "react";
import useEditMode from "./useEditMode";

const useClickOutside = (
  ref: RefObject<HTMLElement>,
  setGetBackLectureOrderTrigger: React.Dispatch<React.SetStateAction<boolean>>,
  getBackLectureOrderTrigger: boolean,
): void => {
  const { isEditMode, handleEditStatus } = useEditMode();
  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setGetBackLectureOrderTrigger(!getBackLectureOrderTrigger);
        handleEditStatus();
      }
    },
    [ref, handleEditStatus],
  );

  useEffect(() => {
    if (isEditMode) {
      document.addEventListener("click", handleClickOutside);
      return () => {
        document.removeEventListener("click", handleClickOutside);
      };
    }
  }, [isEditMode, handleClickOutside]);
};

export default useClickOutside;
