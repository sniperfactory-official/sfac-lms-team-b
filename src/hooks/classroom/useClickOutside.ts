import { RefObject, useEffect, useCallback } from "react";

const useClickOutside = (
  ref: RefObject<HTMLElement>,
  callback: () => void,
  when: boolean,
  setGetBackLectureOrderTrigger: React.Dispatch<React.SetStateAction<boolean>>,
  getBackLectureOrderTrigger: boolean,
): void => {
  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setGetBackLectureOrderTrigger(!getBackLectureOrderTrigger);
        callback();
      }
    },
    [ref, callback],
  );

  useEffect(() => {
    if (when) {
      document.addEventListener("click", handleClickOutside);
      return () => {
        document.removeEventListener("click", handleClickOutside);
      };
    }
  }, [when, handleClickOutside]);
};

export default useClickOutside;
