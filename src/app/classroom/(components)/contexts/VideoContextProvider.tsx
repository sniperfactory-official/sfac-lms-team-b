import React, { FC, useState, useRef } from "react";
import ReactPlayer from "react-player";
import { VideoRefContext } from "./VideoContext";

interface VideoProviderProps {
  children: React.ReactNode;
}

export const VideoRefProvider: FC<VideoProviderProps> = ({ children }) => {
  const [videoRef, setVideoRef] = useState<React.RefObject<ReactPlayer> | null>(
    null,
  );

  return (
    <VideoRefContext.Provider value={{ videoRef, setVideoRef }}>
      {children}
    </VideoRefContext.Provider>
  );
};
