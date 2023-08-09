import { useRef, useEffect } from "react";

interface IProps {
  isFetchingNextPage: boolean;
  hasNextPage: boolean | undefined;
  fetchNextPage: () => void;
}

const useObserver = ({
  isFetchingNextPage,
  hasNextPage,
  fetchNextPage,
}: IProps) => {
  const observerElement = useRef(null);
  useEffect(() => {
    if (isFetchingNextPage || !hasNextPage) return;

    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      { rootMargin: "0px" },
    );

    const el = observerElement && observerElement.current;
    if (!el) return;

    observer.observe(el);

    return () => observer.unobserve(el);
  }, [isFetchingNextPage, hasNextPage, fetchNextPage]);

  return { observerElement };
};

export default useObserver;
