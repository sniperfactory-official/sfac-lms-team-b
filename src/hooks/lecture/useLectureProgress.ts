import { useEffect, useState } from "react";
import { useUpdateProgress } from "@/hooks/mutation/useUpdateProgress";

export const useLectureProgress = (id: string, duration: number) => {
  const [progress, setProgress] = useState({ playedSeconds: 0, played: 0 });
  const [dbUpdateTrigger, setDbUpdateTrigger] = useState(0);
  const updateProgress = useUpdateProgress();

  useEffect(() => {
    const interval = setInterval(() => {
      setDbUpdateTrigger(prev => prev + 1);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (dbUpdateTrigger > 0 && progress.playedSeconds) {
      const start = progress.playedSeconds.toString();
      const end = (progress.playedSeconds / duration).toString();

      if (isFinite(Number(end))) {
        (async () => {
          await updateProgress.mutateAsync({ id, start, end });
        })();
      } else {
        console.warn("End value is not finite, skipping DB update");
      }
    }
  }, [dbUpdateTrigger]);

  const handleProgress = (state: { playedSeconds: number; played: number }) => {
    setProgress(state);
  };

  return { handleProgress };
};
